import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decodeToken } from "react-jwt";
import axios, { type AxiosResponse } from "axios";
import { CallbackRouteError } from "@auth/core/errors";
import { type JWT } from "next-auth/jwt";

export interface IUserDecodedToken {
  role: string;
  email: string;
  name: string;
  sub: string;
  exp: number;
}

function shouldUpdateToken(token: JWT): boolean {
  if (Date.now() < token.exp * 1000 - 10000) {
    return false;
  }
  console.log("============ 토큰 업데이트 시작 ============");
  return true;
}

const getUsers = async (credentials: Partial<any>): Promise<User | null> => {
  const { email, password } = credentials;

  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    {
      email,
      password,
    },
  );

  if (response === null || response.status !== 200) {
    throw new CallbackRouteError("UNAUTHORIZED");
  }

  const headers = response.headers;
  const accessToken: string = headers?.authorization;
  if (accessToken === null || accessToken === undefined) {
    throw new CallbackRouteError("accessToken not found");
  }
  const userDecodedToken: IUserDecodedToken | null = decodeToken(accessToken);
  if (userDecodedToken == null) {
    throw new CallbackRouteError("JWT decoded error");
  }

  const cookie = headers["set-cookie"];
  if (cookie === undefined) {
    throw new CallbackRouteError("refreshToken not found");
  }
  const match = cookie[0].match(/refresh=([^;]*)/);
  const refreshToken = match !== null ? match[1] : "";

  return {
    email: email ?? "",
    name: email ?? "",
    role: userDecodedToken.role ?? "",
    exp: userDecodedToken.exp ?? "",
    accessToken,
    refreshToken,
  } satisfies User;
};

const refreshAccessToken = async (token: JWT): Promise<JWT | null> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reissue`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Cookie: `refresh=${token.refreshToken}`,
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const newAccessToken = response.headers.get("Authorization");
    let userDecodedToken: IUserDecodedToken | null = null;

    if (newAccessToken !== null) {
      userDecodedToken = decodeToken(newAccessToken);
    }

    if (userDecodedToken === null) {
      throw Error("JWT decoded error");
    }

    const cookies = response.headers.get("Set-Cookie");
    const match = cookies?.match(/refresh=([^;]*)/);
    const newRefreshToken = match != null ? match[1] : null;

    return {
      ...token,
      exp: userDecodedToken?.exp ?? 0,
      accessToken: newAccessToken ?? "",
      refreshToken: newRefreshToken ?? "",
      error: null,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // sec
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return await getUsers(credentials);
      },
    }),
  ],
  callbacks: {
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user, trigger }) => {
      // 로그인 시 user 객체에 값이 들어옴
      if (trigger === "signIn") {
        if (
          user?.accessToken !== undefined &&
          user?.refreshToken !== undefined
        ) {
          token = Object.assign(token, user);
          return token;
        }
        return null;
      }

      if (token.accessToken === null || token.accessToken === undefined) {
        console.error("콜백 jwt에 accessToken 없음. token: ", token);
        return null;
      }

      if (shouldUpdateToken(token)) {
        const newTokenInfo = await refreshAccessToken(token);
        if (newTokenInfo === null) {
          // 세션을 초기화하고 로그인 페이지로 리다이렉트할 수 있습니다.
          return null;
        }
        token = Object.assign(token, newTokenInfo);
      }
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("콜백 session: ", session, ", token:", token);
      if (token === null) {
        return token;
      }
      session = Object.assign(session, token);
      session.expires = new Date(token.exp * 1000);
      return session;
    },
  },
});
