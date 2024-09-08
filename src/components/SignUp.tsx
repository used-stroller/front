"use client";

import { signUpWithCredentials } from "@/serverActions/auth";
import styles from "@/styles/user.module.css";
import { useRouter } from "next/navigation";
import { type ReactElement, useRef, useState, useTransition } from "react";

export function SignUp(): ReactElement {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitSignup = (formData: FormData): void => {
    startTransition(async () => {
      const response = await signUpWithCredentials(formData);
      if (response?.error === null) {
        setTimeout(() => {
          setMessage("가입완료. 로그인 페이지로 이동...");
        }, 0);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      }
      inputRef.current?.focus();
      setMessage(response?.error);
    });
  };

  const goHome = (): void => {
    router.push("/");
  };

  return (
    <>
      <form action={submitSignup} className={styles.user_container}>
        <h1>회원가입</h1>
        <input
          ref={inputRef}
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={isPending}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={isPending}
        />
        <button className={styles.button} type={"submit"}>
          회원가입
        </button>
        {message !== null && <span>{message}</span>}
      </form>
      <button className={`${styles.button} ${styles.home}`} onClick={goHome}>
        홈으로
      </button>
    </>
  );
}
