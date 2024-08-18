"use client";

import styles from "@/styles/user.module.css";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SubPageLogo(): JSX.Element {
  const router = useRouter();

  return (
    <div
      className={styles.logo}
      onClick={() => {
        if (location.pathname === "/") {
          router.refresh();
        } else {
          router.push("/");
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          router.push("/");
        }
      }}
      role="button"
      tabIndex={0}
    >
      <Image
        src="./images/logo_block.png"
        alt="중모차 로고"
        width={142}
        height={54}
        priority={true}
      />
    </div>
  );
}
