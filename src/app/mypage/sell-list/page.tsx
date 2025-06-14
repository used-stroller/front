"use client";
import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import SellListPage from "@/components/SellList";

export default function favorite(): ReactElement {
  return (
    <div className={styles.contents}>
      <div className={styles.header_wrapper}>
        <Logo />
        <Menu />
      </div>
      <div className={styles.product_container}>
        <SellListPage />
      </div>
    </div>
  );
}
