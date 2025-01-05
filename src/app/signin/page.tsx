import type { ReactElement } from "react";
import styles from "@/styles/user.module.css";
import SubPageLogo from "@/components/SubPageLogo";
import { SignIn } from '@/components/SignIn';

export default function Login(): ReactElement {
  return (
    <div className={styles.contents}>
      <SubPageLogo />
      <SignIn />
    </div>
  );
}
