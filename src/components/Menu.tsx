import styles from "@/styles/page.module.css";
import Link from "next/link";
import React, { type ReactElement, useEffect, useState } from "react";
import { signOutWithForm } from "@/serverActions/auth";
import { useSession } from "next-auth/react";

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
        <>
          <form action={signOutWithForm}>
            <button type="submit">logout</button>
          </form>
          <Link href="/mypage">mypage</Link>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          <Link href="/signup">signup</Link>
        </>
      )}
    </div>
  );
}
