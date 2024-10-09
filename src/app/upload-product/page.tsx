import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import Logo from "@/components/Logo";
import MyDropzone from "@/components/MyDropzone";

export default function recommend(): ReactElement {
  return (
    <div className={styles.contents}>
      <div className={styles.header_wrapper}>
        <Logo />
      </div>
      <div className={styles.product_container}>
        <MyDropzone />
      </div>
    </div>
  );
}
