"use client";

import styles from "@/styles/aiBar.module.css";
import Link from "next/link";

const AiBox: React.FC = () => {
  return (
    <Link href="/gpt/recommend" className={styles.not_found_link}>
      <div className={styles.ai_card}>
        <div className={styles.ai_card_text}>
          <div className={styles.ai_card_title}>✨ AI가 추천하는 유모차</div>
          <div className={styles.ai_card_subtitle}>
            우리 아기에게 맞는 유모차가 궁금하다면 클릭!
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AiBox;
