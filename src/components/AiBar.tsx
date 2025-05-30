"use client";

import styles from "@/styles/aiBar.module.css";

const AiBox: React.FC = () => {
  const moveToRecommend = (): void => {
    const jwtToken = getCookie("jwt");
    if (jwtToken != null) {
      window.location.href = "/gpt/recommend";
    } else {
      window.location.href = "/signin";
    }
  };
  // 토큰확인
  const getCookie = (name: string): string | null => {
    const cookieList = document.cookie.split("; ");
    const cookie = cookieList.find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={moveToRecommend}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          moveToRecommend();
        }
      }}
      className={styles.not_found_link}
    >
      <div className={styles.ai_card}>
        <div className={styles.ai_card_text}>
          <div className={styles.ai_card_title}>✨ AI가 추천하는 유모차</div>
          <div className={styles.ai_card_subtitle}>
            우리 아기에게 맞는 유모차가 궁금하다면 클릭!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiBox;
