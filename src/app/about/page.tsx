import Ad from "@/components/Ad";
import type { ReactElement } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/about.module.css";

export default function About(): ReactElement {
  return (
    <div className={styles.contents}>
      <Logo />
      <Ad />
    </div>
  );
}
