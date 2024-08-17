import { type DefaultUser } from "next-auth";
import { type DefaultSession } from "next-auth/src/core/types";

export declare module "next-auth" {
  interface User extends DefaultUser {
    email: string;
    name: string;
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
    role: string;
    expires: Date;
    exp: number;
    error?: string | null;
    errorCode?: string | null;
  }
}

export declare module "@auth/core/jwt" {
  interface JWT {
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    exp: number;
    role: string;
    error?: string | null;
    errorCode?: string | null;
  }
}
