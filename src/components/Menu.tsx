import styles from "@/styles/page.module.css";
import Link from "next/link";
import React, { type ReactElement, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Menu(): ReactElement {
  const session = useSession();
  const [isSession, setIsSession] = useState<boolean>(false);

  useEffect(() => {
    if (session.status === "unauthenticated" && session.data === null) {
      setIsSession(false);
      console.log("menu session 널: ", session);
    } else {
      setIsSession(true);
      console.log("menu session 널 아님: ", session);
    }
  }, [session]);

  return (
    <div className={styles.menu}>
      <Link href={"/about"}>
        <h3>About</h3>
      </Link>
      {isSession ? (
        <button
          onClick={async () => {
            await signOut();
          }}
        >
          로그아웃
        </button>
      ) : (
        <>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </>
      )}
    </div>
  );
}
