import type { ReactElement } from "react";
import styles from "@/styles/user.module.css";
import { SignIn } from "@/components/SignIn";
import SubPageLogo from "@/components/SubPageLogo";

export default function Login(): ReactElement {
  return (
    <div className={styles.contents}>
      <SubPageLogo />
      <SignIn />
    </div>
  );
}
