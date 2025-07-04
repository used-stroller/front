"use client";

import styles from "@/styles/rentalDetail.module.css";

export default function RentalDetailPage() {
  return (
    <div className={styles.rentalContainer}>
      {/* 이미지 박스 */}
      <div className={styles.imageWrapper}>
        <img
          src="/stroller1.jpg"
          alt="부가부 폭스3 모닝핑크"
          className={styles.mainImage}
        />
        <div className={styles.imageCount}>1 / 12</div>
      </div>

      {/* 상품정보 */}
      <h1 className={styles.productTitle}>
        부가부 폭스3 모닝핑크 (3개월 대여)
      </h1>
      <div className={styles.soldout}>SOLDOUT</div>
      <div className={styles.price}>251,000원</div>
      <div className={styles.badge}>배송일 선택 가능</div>

      {/* 하단 버튼 */}
      <div className={styles.bottomBar}>
        <div className={styles.like}>❤️ 2</div>
        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.light}`}>장바구니</button>
          <button className={`${styles.btn} ${styles.dark}`}>결제하기</button>
        </div>
      </div>
    </div>
  );
}
