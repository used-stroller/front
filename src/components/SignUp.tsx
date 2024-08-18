"use client";

import { signUpWithCredentials } from "@/serverActions/auth";
import styles from "@/styles/user.module.css";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function SignUp(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const submitSignup = (formdata: FormData): void => {
    startTransition(async () => {
      const response = await signUpWithCredentials(formdata);
      setError(response?.error);
    });
  };

  const goHome = (): void => {
    router.push("/");
  };

  return (
    <>
      <form action={submitSignup} className={styles.user_container}>
        <h1>중모차와 함께하기</h1>
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
          회원가입
        </button>
        {error !== null && <span>{error}</span>}
      </form>
      <button className={`${styles.button} ${styles.home}`} onClick={goHome}>
        홈으로
      </button>
    </>
  );
}
