import type { ReactElement } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/about.module.css";
import { Mypage } from "@/components/Mypage";

export default function MypageInfo(): ReactElement {
  return (
    <div className={styles.contents}>
      <Logo />
      <Mypage />
    </div>
  );
}
