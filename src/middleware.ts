import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { getSession } from "@/serverActions/auth";

const matchersForAuth = ["/admin/*", "/mypage/*"];
const matchersForSignIn = ["/login", "/signup", "/logout"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }
  // 인증 후 회원가입 및 로그인 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }
  return NextResponse.next();
}

function isMatch(pathname: string, urls: string[]): boolean {
  return urls.some((url) => !!match(url)(pathname));
}
