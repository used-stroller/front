import type { ReactElement } from "react";
import styles from "@/styles/user.module.css";
import { Mypage } from "@/components/Mypage";

export default function MypageInfo(): ReactElement {
  return (
    <div className={styles.contents}>
      <Mypage />
    </div>
  );
}
