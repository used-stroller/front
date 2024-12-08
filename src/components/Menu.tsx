"use client";

import styles from "@/styles/page.module.css";
import Link from "next/link";
import React, {
  type ReactElement,
  useEffect,
  useState,
  useTransition,
} from "react";
import { getSession, signOutWithForm } from "@/serverActions/auth";

export default function Menu(): ReactElement {
  // const session = useSession();
  const [, startTransition] = useTransition();
  const [isSession, setIsSession] = useState<boolean>(false);

  const refreshSession = (): void => {
    startTransition(() => {
      getSession()
        .then((session) => {
          if (session !== null) {
            setIsSession(true);
          }
        })
        .catch((error) => {
          console.error("Error refreshing session:", error);
        });
    });
  };

  const submitSignOut = async (formData: FormData): Promise<void> => {
    try {
      // 비동기 처리, 예를 들어 서버에 로그아웃 요청을 보냄
      await signOutWithForm(formData);
      setIsSession(false); // 세션 종료 처리
    } catch (error) {
      console.error("Sign out failed:", error);
      throw error; // 오류를 호출한 곳으로 전달
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    submitSignOut(formData).catch((e) => {
      console.error(e);
    });
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <div className={styles.menu}>
      <Link href={"/about"}>
        <h3>소개</h3>
      </Link>
      {isSession ? (
        <>
          <form onSubmit={handleSubmit}>
            <button type="submit">로그아웃</button>
          </form>
          <Link href="/mypage">마이페이지</Link>
        </>
      ) : (
        <>
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </>
      )}
    </div>
  );
}
