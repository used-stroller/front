// next-auth.d.ts

import { Session as NextAuthSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends NextAuthSession {
    user: {
      id: string;
      kakaoId: string;
      name: string;
      email: string;
      profileImage: string;
    };
  }

  interface User {
    email: string;
    name: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    exp: number;
    kakaoId?: string;
    profileImage?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    kakaoId: string;
    name: string;
    email: string;
    profileImage: string;
  }
}
