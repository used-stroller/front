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
    startTransition(async () => {
      const session = await getSession();
      if (session !== null) {
        setIsSession(true);
      }
    });
  };

  const submitSignOut = async (formData: FormData): Promise<void> => {
    startTransition(async () => {
      await signOutWithForm(formData);
      setIsSession(false);
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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
