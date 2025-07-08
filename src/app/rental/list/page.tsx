"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/rental.module.css";
import { RentalData } from "@/types";
import apiClient from "@/utils/apiClient";

const tabs = [
  { label: "디럭스", type: "DELUXE" },
  { label: "절충형", type: "CONVERTIBLE" },
  { label: "휴대형", type: "HANDY" },
];

export default function RentalPage() {
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
        const { data } = await apiClient.get("/api/rental/list");
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
            onClick={() => setSelectedTab(tab.type)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.cardList}>
        {filteredStrollers.map((stroller) => (
          <div key={stroller.id} className={styles.card}  onClick={() => moveToDetail(stroller.id)}>
            <img
              src={stroller.src}
              alt={stroller.productName}
              className={styles.image}
            />
            <div className={styles.info}>
              <p className={styles.name}>{stroller.productName}</p>
              {stroller.color && <p>색상: {stroller.color}</p>}
              <p>상태: {stroller.grade}</p>
              <p className={styles.price}>
                {stroller.rentalPrice.toLocaleString()}원
              </p>
              <button
                className={
                  stroller.rentable === true
                    ? styles.button
                    : styles.buttonDisabled
                }
                onClick={() => moveToDetail(stroller.id)} // ✅ 클릭될 때만 실행됨}
                disabled={stroller.rentable !== true}
              >
                {stroller.rentable === true ? "대여 가능" : "대여중"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
