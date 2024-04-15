import "@/styles/reset.css";
import "@/styles/globals.css";
import React, { type ReactElement } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { FilterProvider } from "@/context/FilterContext";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://jungmocha.co.kr"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/ko-KR",
    },
  },
  title: "똑똑한 엄빠의 중모차",
  description: "똑똑한 엄빠의 중모차",
  keywords:
    "중모차, 중고유모차, 유모차, 중고거래, 반려동물 유모차, 반려견 유모차, 반려동물",
  applicationName: "중모차",
  authors: [{ name: "Team Three", url: "hoonyhoeny@gmail.com" }],
  robots: "index, follow",
  openGraph: {
    title: "중모차",
    description: "똑똑한 엄빠의 중모차",
    type: "website",
    url: "https://jungmocha.co.kr",
    images: [{ url: `https://jungmocha.co.kr/images/logo_block.png` }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "";
  const gtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER ?? "";

  return (
    <html lang="ko">
      <body>
        <GoogleTagManager gtmId={gtmId} />
        <GoogleAnalytics gaId={gaId} />
        <FilterProvider>
          <div className="main">
            {children}
            <Footer />
          </div>
        </FilterProvider>
      </body>
    </html>
  );
}
