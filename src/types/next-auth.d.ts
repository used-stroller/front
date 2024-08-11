import { type DefaultJWT } from "next-auth/jwt";
import { type DefaultUser } from "next-auth";
import { type DefaultSession } from "next-auth/src/core/types";

declare module "next-auth" {
  interface User extends DefaultUser {
    email: string;
    name: string;
    adminSeq: number;
    role: string;
    accessToken: string;
    refreshToken: string;
    exp: number;
  }
  interface Session extends DefaultSession {
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    role: string;
    error?: string | null;
    errorCode?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    role: string;
    error?: string | null;
    errorCode?: string | null;
  }
}
