"use client";

import React, { type ReactElement, useEffect, useRef, useState } from "react";
import Product from "@/components/Product";
import { type Content } from "@/types";
import apiClient from "@/utils/apiClient";

const FavoritePage = (): ReactElement => {
  const [products, setProducts] = useState<Content[]>([]);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get(
          `${apiUrl}/api/user/mypage/favorites`,
        );
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
      <div ref={elementRef} style={{ textAlign: "center" }}>
        <img src="/images/loading.svg" alt="loading" width={50} height={50} />
      </div>
    </>
  );
};

export default FavoritePage;
