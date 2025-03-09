import "@/styles/reset.css";
import "@/styles/globals.css";
import React, { type ReactElement } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { FilterProvider } from "@/context/FilterContext";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import ClientSessionProvider from "@/components/ClientSessionProvider"; // 클라이언트 컴포넌트로 SessionProvider 처리
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  verification: {
    other: {
      "naver-site-verification": "5517d95af4969a496cdba656444f3dcd128ecdc6",
    },
  },
  metadataBase: new URL("https://jungmocha.co.kr"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/ko-KR",
    },
  },
  title: "똑똑한 엄빠의 중모차",
  description:
    "중고유모차 구매팁! 중고플랫폼의 유모차매물만 모아서 보여드립니다. 중고유모차 살때 , 똑똑한 엄빠의 선택 “중모차”에서 검색하세요! ",
  keywords:
    "중모차, 중고 유모차, 부가부, 스토케, 줄즈, 절충형, 디럭스, 중고유모차 구매팁, 중고유모차 살때, 중고유모차 팔때",
  applicationName: "중모차",
  authors: [{ name: "Team Three", url: "hoonyhoeny@gmail.com" }],
  robots: "index, follow",
  openGraph: {
    title: "중모차",
    description:
      "중고유모차 구매팁! 중고플랫폼의 유모차매물만 모아서 보여드립니다. 중고유모차 살때 , 똑똑한 엄빠의 선택 “중모차”에서 검색하세요! ",
    type: "website",
    url: "https://jungmocha.co.kr",
    images: [{ url: `https://jungmocha.co.kr/images/logo_block.png` }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<ReactElement> {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ?? "";
  // 서버에서 세션을 가져옵니다.
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body>
        <ClientSessionProvider session={session}>
          <GoogleTagManager gtmId={gtmId} />
          <GoogleAnalytics gaId={gaId} />
          <FilterProvider>
            <div className="main">
              {children}
              <Footer />
            </div>
          </FilterProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
