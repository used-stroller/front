"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/inventory.module.css";
import apiClient from "@/utils/apiClient";

// 서버에서 받아오는 데이터 타입 정의
interface RentalItem {
  id: number;
  productName: string;
  rentalCount: number;
  colors: string;
}

interface AccessoryItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

// props 타입 (혹시 나중에 SSR로 받는다면 사용)
interface InventoryPageProps {
  strollers?: RentalItem[];
  accessories?: AccessoryItem[];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function InventoryPage({
  strollers,
  accessories,
}: InventoryPageProps) {
  const [rentalList, setRentalList] = useState<RentalItem[]>([]);
  const [accList, setAccList] = useState<AccessoryItem[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get("/api/rental/get/stock");
        const rental: RentalItem[] = data.data.rental;
        const acc: AccessoryItem[] = data.data.acc;
        setRentalList(rental);
        setAccList(acc);
        console.log("rental", rental);
        console.log("acc", acc);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>
        <img src="../images/bassinet_on.svg" alt="유모차" /> 유모차
      </h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>개수</th>
            <th>색상</th>
          </tr>
        </thead>
        <tbody>
          {rentalList.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.rentalCount}</td>
              <td>{item.colors}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>
        <img src="../images/footmuff_on.svg" alt="악세사리" /> 악세사리
      </h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>상품명</th>
            <th>개수</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {accList.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price.toLocaleString("ko-KR")} 원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
