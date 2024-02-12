import "@/styles/reset.css";
import "@/styles/globals.css";
import React, { type ReactElement } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
    url: "https://www.jungmocha.com",
    images: [{ url: "/images/logo_block.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
