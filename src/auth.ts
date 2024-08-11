import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decodeToken } from "react-jwt";
import { type JWT } from "@auth/core/jwt";
import axios from "axios";
import { z } from "zod";
import { CallbackRouteError } from "@auth/core/errors";

export interface IUserDecodedToken {
  role: string;
  email: string;
  name: string;
  sub: string;
  exp: number;
}

function shouldUpdateToken(token: JWT) {
  if (Date.now() < token.accessTokenExpiry * 1000) {
    // console.log(
    //   "업데이트 안해도 됨. Date.now(): ",
    //   Date.now(),
    //   Date.now() < token.accessTokenExpiry * 1000,
    // );
    return false;
  }
  // console.log(
  //   "업데이트 해야 됨. Date.now(): ",
  //   Date.now(),
  //   Date.now() < token.accessTokenExpiry * 1000,
  // );
  return true;
}

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reissue`;
  console.log("refresh url: ", url, token.refreshToken);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `refresh=${token.refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }
    const newAccessToken = response.headers.get("Authorization");
    const userDecodedToken: IUserDecodedToken | null =
      decodeToken(newAccessToken);
    if (!userDecodedToken) {
      throw Error("JWT decoded error");
    }

    const cookies = response.headers.get("Set-Cookie");
    const match = cookies?.match(/refresh=([^;]*)/);
    const newRefreshToken = match ? match[1] : null;

    // return user object with their profile data
    return {
      ...token,
      accessTokenExpiry: userDecodedToken.exp ?? "",
      accessToken: newAccessToken ?? "",
      refreshToken: newRefreshToken ?? "",
      error: null,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return {
      ...token,
      accessTokenExpiry: 0,
      accessToken: "",
      refreshToken: "",
      error: "RefreshAccessTokenError",
    };
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User> => {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(3, "Must be a valid email address"),
          })
          .safeParse(credentials);

        try {
          if (!parsedCredentials.success) {
            throw new CallbackRouteError("Invalid Credentials");
          }
          const { email, password } = parsedCredentials.data;

          const response = await axios.post("http://localhost:8080/login", {
            email,
            password,
          });

          if (response.status !== 200) {
            return null;
          }

          const { headers } = response;
          const accessToken = headers.getAuthorization();
          const userDecodedToken: IUserDecodedToken | null =
            decodeToken(accessToken);
          if (!userDecodedToken) {
            throw new CallbackRouteError("JWT decoded error");
          }

          const cookie = headers["set-cookie"];
          const match = cookie[0]?.match(/refresh=([^;]*)/);
          const refreshToken = match ? match[1] : "";

          return {
            id: "",
            email: email ?? "",
            name: email ?? "",
            role: userDecodedToken.role ?? "",
            exp: userDecodedToken.exp ?? "",
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("authorize 에러!", error.response.data);
          throw new CallbackRouteError(
            "로그인 실패! 아이디와 비밀번호를 확인 해 주세요.",
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("콜백 jwt: ", token, " / user: ", user);

      // 로그인 시 user 객체에 값이 들어옴
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiry = user.exp;
        token.role = user.role;
        token.exp = user.exp;
        // console.log("신규 로그인: ", token);
        return token;
      }

      if (token.accessToken === null || token.accessToken === undefined) {
        return token;
      }

      if (shouldUpdateToken(token)) {
        const newTokenInfo = await refreshAccessToken(token);
        if (newTokenInfo.error === "RefreshAccessTokenError") {
          // 세션을 초기화하고 로그인 페이지로 리다이렉트할 수 있습니다.
          return {
            accessToken: null,
            refreshToken: null,
            accessTokenExpiry: null,
            role: null,
            exp: 0,
            iat: 0,
            sub: null,
            email: null,
            name: null,
            error: "RefreshAccessTokenError",
          };
        }
        return newTokenInfo;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("콜백 session: ", session, " / token:", token);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token.error;
      session.role = token.role;
      session.expires = new Date(token.accessTokenExpiry * 1000);
      return session;
    },
  },
});
