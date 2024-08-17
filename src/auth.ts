import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decodeToken } from "react-jwt";
import { type JWT } from "@auth/core/jwt";
import axios, { type AxiosResponse, type AxiosResponseHeaders } from "axios";
import { z } from "zod";
import { CallbackRouteError } from "@auth/core/errors";

export interface IUserDecodedToken {
  role: string;
  email: string;
  name: string;
  sub: string;
  exp: number;
}

function shouldUpdateToken(token: JWT): boolean {
  if (Date.now() < token.exp * 1000 - 10000) {
    // console.log(
    //   "토큰 업데이트 안해도 됨. ",
    //   Date.now(),
    //   Date.now() < token.exp * 1000 - 10000,
    // );
    return false;
  }
  console.log(
    "====================== 토큰 업데이트 시작 ========================",
  );
  return true;
}

const refreshAccessToken = async (token: JWT): Promise<JWT | null> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reissue`;
  console.log("refresh url: ", url, token.refreshToken);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        Cookie: `refresh=${token.refreshToken}`,
      },
      cache: "force-cache",
    });

    console.log(
      "response: ",
      response.status,
      response.headers.get("Set-Cookie"),
    );

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
      exp: userDecodedToken.exp ?? "",
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
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30, // sec
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

          const response: AxiosResponse = await axios.post(
            "http://localhost:8080/login",
            {
              email,
              password,
            },
          );

          if (response === null || response.status !== 200) {
            throw new CallbackRouteError("로그인 실패! 관리자에게 문의하세요");
          }

          const headers: AxiosResponseHeaders = response.headers;
          const accessToken = headers.get("authorization") as string;
          if (accessToken === null || accessToken === undefined) {
            throw new CallbackRouteError("accessToken not found");
          }
          const userDecodedToken: IUserDecodedToken | null =
            decodeToken(accessToken);
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
    async jwt({ token, user, trigger }) {
      // console.log(
      //   "콜백 jwt: ",
      //   token,
      //   ", user: ",
      //   user,
      //   ", trigger: ",
      //   trigger,
      // );

      // 로그인 시 user 객체에 값이 들어옴
      if (trigger === "signIn") {
        token = Object.assign(token, user);
        return token;
      }

      if (token.accessToken === null || token.accessToken === undefined) {
        console.error("콜백 jwt에 accessToken 없음. token: ", token);
        return token;
      }

      if (shouldUpdateToken(token)) {
        const newTokenInfo = await refreshAccessToken(token);
        if (newTokenInfo === null) {
          // 세션을 초기화하고 로그인 페이지로 리다이렉트할 수 있습니다.
          return null;
        }
        token = Object.assign(token, newTokenInfo);
        console.log(
          "토큰갱신: ",
          new Date(token.exp * 1000),
          token.refreshToken,
        );
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("콜백 session: ", session, ", token:", token);
      if (token === null) {
        console.log("콜백 세션에 토큰 없음. token: ", token);
        return token;
      }
      session = Object.assign(session, token);
      session.expires = new Date(token.exp * 1000);
      return session;
    },
  },
});
