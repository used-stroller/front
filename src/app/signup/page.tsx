import type { ReactElement } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/about.module.css";
import { SignUp } from "@/components/SignUp";

export default function Login(): ReactElement {
  return (
    <div className={styles.contents}>
      <Logo />
      <SignUp />
    </div>
  );
}
