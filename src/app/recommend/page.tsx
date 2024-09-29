import type { ReactElement } from "react";
import styles from "@/styles/page.module.css";
import RecommendPage from "@/components/recommendPage";

export default function recommend(): ReactElement {
  return (
    <div className={styles.contents}>
      <div className={styles.product_container}>
        <RecommendPage></RecommendPage>
      </div>
    </div>
  );
}
