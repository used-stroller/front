import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import Link from "next/link";

export default function NotFound(): ReactElement {
  return (
    <div className={styles.not_found}>
      <div className={styles.logo}></div>
      <h1>
        404
        <span>페이지를 찾을 수 없습니다</span>
      </h1>
      <Link href="/" className={styles.not_found_link}>
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
}
