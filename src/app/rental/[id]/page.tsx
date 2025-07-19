"use client";

import ImageSlider from "@/components/ImageSlider";
import KakaoFloatingButton from "@/components/KakaoFloatingButton";
import styles from "@/styles/rentalDetail.module.css";
import { type RentalData } from "@/types";
import apiClient from "@/utils/apiClient";
import { useParams } from "next/navigation";
import { type ReactElement, useEffect, useState } from "react";
import { FaBabyCarriage } from "react-icons/fa";

export default function RentalDetailPage(): ReactElement {
  const params = useParams<{ id: string }>();
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setRentalData(data.data);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();
  }, []);

  const moveTo = (title: string): void => {
    window.location.href = "/rental/apply?title="+title;
  };

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
      <h1 className={styles.productTitle}>{rentalData?.productName}</h1>
      <div className={styles.price}>
        <span>{rentalData?.rentalPrice.toLocaleString()}원</span>
        <span className={styles.amount_month}>
          (
          {rentalData
            ? Math.round(rentalData.rentalPrice / 3).toLocaleString()
            : "-"}
          원/월)
        </span>
      </div>
      <div>
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
      <div className={styles.rental_inquiry_div}>
        <button className={styles.rental_inquiry_button}
         onClick={() => {
                    moveTo(rentalData?.productName);
                  }} // ✅ 클릭될 때만 실행됨}
        >렌탈 "문의만"하기</button>
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
        <img className="description_image" src="/images/product_detail.jpg" />
        <img className="description_image" src="/images/wheel.gif" />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <FaBabyCarriage className={styles.icon} />
          <span className={styles.title}>제품 상세 사진(실제)</span>
        </div>
        <hr className={styles.underline} />
      </div>

      <div>
        {rentalData?.rentalImages?.map((img, index) => (
          <div key={index} className={styles.detail_images}>
            <img src={process.env.NEXT_PUBLIC_BASE_URL + img.src} />
          </div>
        ))}
      </div>
      <KakaoFloatingButton></KakaoFloatingButton>
    </div>
  );
}
