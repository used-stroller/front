"use client";

import React, {
  type ReactElement,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Product from "@/components/Product";
import { getProductList } from "@/utils/productUtils";
import { useFilter } from "@/context/FilterContext";
import Image from "next/image";
import { type Content } from "@/types";

const InfinityScroll = ({
  setResultCount,
}: {
  setResultCount: (count: SetStateAction<number>) => void;
}): ReactElement => {
  const { filter, handleFilter } = useFilter();
  const [products, setProducts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreItems = useCallback((): void => {
    getProductList(filter)
      .then((response) => {
        setResultCount(response.totalElements);
        if (response.content.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...response.content]);
          handleFilter({
            target: {
              name: "page",
              value: filter.page != null ? filter.page + 1 : 1,
            },
          });
        }
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  }, [filter]);

  // callback 함수 정의
  const onIntersection = useCallback(
    (entries: IntersectionObserverEntry[]): void => {
      const firstEntry = entries[0];
      if (Boolean(firstEntry.isIntersecting) && hasMore) {
        fetchMoreItems();
      }
    },
    [hasMore, fetchMoreItems],
  );

  // product 상태가 업데이트 될때 실행
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (elementRef.current != null) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [products, onIntersection]); // products 가 업데이트 될때마다 hook

  // filter 조건이 변경되면 검색 조건에 맞는 결과가 0 페이지부터 나올 수 있도록 초기화
  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    handleFilter({
      target: {
        name: "page",
        value: 0,
      },
    });
  }, [
    filter.keyword,
    filter.sourceType,
    filter.minPrice,
    filter.maxPrice,
    filter.region,
    filter.period,
    filter.model,
    filter.brand,
    filter.sort,
  ]);

  return (
    <>
      {products?.map((product, index) => (
        <Product content={product} key={index} />
      ))}
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: "center" }}>
          <Image
            src="./images/loading.svg"
            alt="loading"
            width={50}
            height={50}
          />
        </div>
      )}
    </>
  );
};

export default InfinityScroll;
