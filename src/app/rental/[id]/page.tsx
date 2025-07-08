"use client";

import ImageSlider from "@/components/ImageSlider";
import KakaoFloatingButton from "@/components/KakaoFloatingButton";
import styles from "@/styles/rentalDetail.module.css";
import { RentalData } from '@/types';
import apiClient from "@/utils/apiClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RentalDetailPage() {
  const params = useParams();
  const id = params.id; // string

  const sliderSettings = {
    arrows: true, // 이전/다음 화살표 표시
  };

  const [rentalData, setRentalData] = useState<RentalData | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get("/api/rental/get/" + id);
        console.log("data", data);
        setRentalData(data.data);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className={styles.rentalContainer}>
      {/* 이미지 박스 */}
      <div className={styles.imageWrapper}>
        <ImageSlider
          images={rentalData?.rentalImages.map((img) => img.src) || []}
          settings={sliderSettings}
        />
        {/* <div className={styles.imageCount}>1 / 12</div> */}
      </div>

      {/* 상품정보 */}
      <h1 className={styles.productTitle}>
        {rentalData?.productName}
      </h1>
      <div className={styles.price}>{rentalData?.rentalPrice.toLocaleString()}원</div>
      <div >
        <span className={styles.badge}>{rentalData?.color}</span>
        <span className={styles.badge}>{rentalData?.grade}</span>
        <span className={styles.badge}>무게{rentalData?.weight}kg</span>
        <span className={styles.badge}>{rentalData?.size}cm</span>                      
      </div>
      <div>
          {rentalData?.description.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}

      </div>

      {/* 하단 버튼 */}
      {/* <div className={styles.bottomBar}>
        <div className={styles.like}>❤️ 2</div>
        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.light}`}>장바구니</button>
          <button className={`${styles.btn} ${styles.dark}`}>결제하기</button>
        </div>
      </div> */}
      <div className={styles.description_image_container}>
        <img className="description_image" src="https://jungmocha.co.kr/image/rental/test1.jpg"/>
      </div>
      <KakaoFloatingButton></KakaoFloatingButton>
    </div>
  );
}
