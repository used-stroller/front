import { type JWT as NextAuthJWT } from "next-auth/jwt";

export declare module "next-auth" {
  interface User {
    email: string;
    name: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    exp: number;
  }
  interface Session {
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

export declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
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
