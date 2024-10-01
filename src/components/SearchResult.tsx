"use client";
import styles from "@/styles/page.module.css";
import React, {
  type ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFilter } from "@/context/FilterContext";
import Link from "next/link";

const SearchResult = ({
  resultCount,
}: {
  resultCount: number;
}): ReactElement => {
  const { filter, handleFilter } = useFilter();
  const [uploadDate, setUploadDate] = useState("");
  const [price, setPirce] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(resultCount);
  }, [resultCount]);

  const handlePriceFilters = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const target = ev.target as HTMLButtonElement;
      if (price.includes(target.value)) {
        setPirce("");
      } else {
        setPirce(target.value);
      }
    },
    [price],
  );

  const handleSecondFilters = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const target = ev.target as HTMLButtonElement;
      if (uploadDate.includes(target.value)) {
        setUploadDate("");
      } else {
        setUploadDate(target.value);
      }
    },
    [uploadDate],
  );

  useEffect(() => {
    handleFilter({
      target: {
        name: "sort",
        value: [price, uploadDate].filter((v) => v !== "").join(","),
      },
    });
  }, [uploadDate, price]);

  return (
    <div className={styles.search_result_wrapper}>
      <div className={styles.search_result}>
        <span className={styles.keyword}>{filter.keyword ?? "모든 상품"}</span>
        검색결과 <span className={styles.result_qty}>{count}</span> 개
      </div>
      <div className={styles.second_filter}>
        <button className={styles.recommend}>
          <Link href={"/recommend"}>추천매물</Link>
        </button>
        <button
          onClick={handleSecondFilters}
          className={
            uploadDate.includes("uploadDate,desc") ? styles.active : ""
          }
          value={"uploadDate,desc"}
        >
          최신순
        </button>
        <button
          onClick={handlePriceFilters}
          className={price.includes("price,asc") ? styles.active : ""}
          value={"price,asc"}
        >
          저가순
        </button>
        <button
          onClick={handlePriceFilters}
          className={price.includes("price,desc") ? styles.active : ""}
          value={"price,desc"}
        >
          고가순
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
