import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match } from "path-to-regexp";
import { auth } from "@/auth";

const matchersForAuth = ["/admin/*", "/mypage/*"];
const matchersForSignIn = ["/login", "/signup"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  // 인증이 필요한 페이지 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    // console.log("로그인 필요 session: ", session);

    return session
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }
  // 인증 후 회원가입 및 로그인 접근 제어
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    // console.log("로그인 필요없음 session: ", session);

    return session
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }
  console.log(
    "middleware pass session: ",
    session,
    " / pathname: ",
    request.nextUrl.pathname,
  );
  return NextResponse.next();
}

function isMatch(pathname: string, urls: string[]): boolean {
  return urls.some((url) => !!match(url)(pathname));
}

// 아래 설정을 제외한 나머지 모든 경로에 대해 미들웨어가 실행되도록 설정
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
