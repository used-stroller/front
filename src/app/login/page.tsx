import type { ReactElement } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/about.module.css";
import { SignIn } from "@/components/SignIn";

export default function About(): ReactElement {
  return (
    <div className={styles.contents}>
      <Logo />
      <SignIn />
    </div>
  );
}
