import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import RecommendPage from "@/components/RecommendPage";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";

export default function recommend(): ReactElement {
  return (
    <div className={styles.contents}>
      <div className={styles.header_wrapper}>
        <Logo />
        <Menu />
      </div>
      <div className={styles.product_container}>
        <RecommendPage />
      </div>
    </div>
  );
}
