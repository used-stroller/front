"use client";

import React, { type ReactElement, useEffect, useState } from "react";
import Product from "@/components/Product";
import { type Content } from "@/types";
import apiClient from "@/utils/apiClient";

const SellListPage = (): ReactElement => {
  const [products, setProducts] = useState<Content[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get(
          `${apiUrl}/api/user/mypage/selling-list`,
        );
        console.log("data", data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setProducts(data.data);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();
  }, []);

  useEffect(() => {
    setProducts([]);
  }, []);

  return (
    <>
      {products?.map((product, index) => (
        <Product content={product} key={index} />
      ))}
    </>
  );
};

export default SellListPage;
