"use client";

import { signInWithCredentials } from "@/serverActions/auth";
import styles from "@/styles/user.module.css";
import { type ReactElement, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export const SignIn = (): ReactElement => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submitLogin = (formdata: FormData): void => {
    startTransition(async () => {
      const response = await signInWithCredentials(formdata);
      if (response?.error === null) {
        router.push("/");
      }
      setError(response?.error);
    });
  };

  const goHome = (): void => {
    router.push("/");
  };

  const goSignup = (): void => {
    router.push("/signup");
  };

  return (
    <>
      <form action={submitLogin} className={styles.user_container}>
        <h1>로그인</h1>
        <input
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
          로그인
        </button>
        {error !== null && <span>{error}</span>}
      </form>
      <div className={`${styles.container}`}>
        <button onClick={goHome} className={`${styles.button} ${styles.home}`}>
          홈으로
        </button>
        <button
          onClick={goSignup}
          className={`${styles.button} ${styles.signup}`}
        >
          회원가입
        </button>
      </div>
    </>
  );
};
