"use client";

import styles from "@/styles/page.module.css";
import Link from "next/link";
import React, { type ReactElement, useEffect, useState } from "react";

export default function Menu(): ReactElement {
  const [isSession, setIsSession] = useState<boolean>(false);

  useEffect(() => {
    // 쿠키에서 jwt 값을 확인
    const cookies = document.cookie.split(";");
    console.log("cookies", cookies);
    const jwtCookie = cookies.find((cookie) => cookie.trim().startsWith("jwt"));

    // jwt가 존재하면 isSession을 true로 설정
    if (jwtCookie) {
      setIsSession(true);
    }
  }, []);

  // // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  // };

  return (
    <div className={styles.menu}>
      <Link href={"/about"}>
        <h3>소개</h3>
      </Link>
      <Link href={"policy/privacy"}>
        <h3>개인정보 처리방침</h3>
      </Link>
      {/* {isSession ? (
        <>
          <Link href="/mypage">마이페이지</Link>
        </>
      ) : (
        <>
          <Link href="/signin">로그인</Link>
        </>
      )} */}
    </div>
  );
}
