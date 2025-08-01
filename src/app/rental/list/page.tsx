/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";

import { type ReactElement, useEffect, useState } from "react";
import styles from "@/styles/rental.module.css";
import { type RentalData } from "@/types";
import apiClient from "@/utils/apiClient";

const tabs = [
  { label: "디럭스", type: "DELUXE" },
  { label: "절충형", type: "CONVERTIBLE" },
  { label: "휴대형", type: "HANDY" },
];

interface RentalListResponse {
  data: {
    contents: RentalData[];
  };
}

export default function RentalPage(): ReactElement {
  const [rentalData, setRentalData] = useState<RentalData[]>([]);
  const [selectedTab, setSelectedTab] = useState("DELUXE");

  const filteredStrollers = rentalData.filter(
    (item) => item.strollerType === selectedTab,
  );

  const moveToDetail = (id: number): void => {
    window.location.href = "/rental/" + id;
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } =
          await apiClient.get<RentalListResponse>("/api/rental/list");
        console.log("data", data.data.contents);
        setRentalData(data.data.contents);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>프리미엄 유모차 대여</h1>
      <p className={styles.subtitle}>PREMIUM STROLLER RENTAL</p>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.type}
            className={`${styles.tabButton} ${
              tab.type === selectedTab ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedTab(tab.type);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.cardList}>
        {filteredStrollers.map((stroller) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            key={stroller.id}
            className={styles.card}
            onClick={() => {
              moveToDetail(stroller.id);
            }}
          >
            <p className={styles.name}>{stroller.productName}</p>
            <div className={styles.product_detail_info}>
              <img
                src={stroller.src ? stroller.src : "/images/preparing.png"}
                alt={stroller.productName ?? "상품 준비중"}
                className={styles.image}
              />
              <div className={styles.info}>
                {stroller.color && <p>색상: {stroller.color}</p>}
                <p>상태: {stroller.grade}</p>
                <p className={styles.price}>
                  {stroller.rentalPrice.toLocaleString()}원
                </p>

                <button
                  className={
                    stroller.rentable ? styles.button : styles.buttonDisabled
                  }
                  onClick={() => {
                    moveToDetail(stroller.id);
                  }} // ✅ 클릭될 때만 실행됨}
                  disabled={!stroller.rentable}
                >
                  {stroller.rentable ? "대여 가능" : "대여중"}
                </button>
                <div>
                  {!stroller.rentable ? (
                    <>
                      {/* <span className={styles.rental_period}>
                        {stroller.rentalStart}~
                      </span> */}
                      <span className={styles.rental_period}>
                        ~{stroller.rentalEnd} 까지
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
