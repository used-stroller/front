import styles from "@/styles/page.module.css";
import Link from "next/link";
import React, { type ReactElement } from "react";

export default function Menu(): ReactElement {
  return (
    <div className={styles.menu}>
      <Link href={"/about"}>
        <h3>About</h3>
      </Link>
    </div>
  );
}
