import type { ReactElement } from "react";
import styles from "@/styles/user.module.css";
import { Mypage } from "@/components/Mypage";
import SubPageLogo from "@/components/SubPageLogo";

export default function MypageInfo(): ReactElement {
  return (
    <div className={styles.contents}>
      <SubPageLogo />
      <Mypage />
    </div>
  );
}
