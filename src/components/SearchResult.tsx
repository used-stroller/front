"use client";
import styles from "@/styles/page.module.css";
import React, {
  type ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFilter } from "@/context/FilterContext";

const SearchResult = ({
  resultCount,
}: {
  resultCount: number;
}): ReactElement => {
  const { filter, handleFilter } = useFilter();
  const [second, setSecond] = useState("");

  const handleSecondFilter = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const target = ev.target as HTMLButtonElement;
      second === target.value ? setSecond("") : setSecond(target.value);
    },
    [second],
  );

  useEffect(() => {
    handleFilter({
      target: {
        name: "sort",
        value: second,
      },
    });
  }, [second]);

  return (
    <div className={styles.search_result_wrapper}>
      <div className={styles.search_result}>
        <span className={styles.keyword}>{filter.keyword ?? "모든 상품"}</span>
        검색결과 <span className={styles.result_qty}>{resultCount}</span> 개
      </div>
      <div className={styles.second_filter}>
        <button
          onClick={handleSecondFilter}
          className={second === "uploadDate,desc" ? styles.active : ""}
          value={"uploadDate,desc"}
        >
          최신순
        </button>
        <button
          onClick={handleSecondFilter}
          className={second === "price,asc" ? styles.active : ""}
          value={"price,asc"}
        >
          저가순
        </button>
        <button
          onClick={handleSecondFilter}
          className={second === "price,desc" ? styles.active : ""}
          value={"price,desc"}
        >
          고가순
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
