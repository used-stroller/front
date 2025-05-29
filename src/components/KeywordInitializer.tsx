"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFilter } from "@/context/FilterContext";

// 처음 로드할때 url에 있는 keyword를 filter에 set하는 함수
const KeywordInitializer = (): void => {
  const searchParams = useSearchParams();
  const keywordFromURL = searchParams.get("keyword") ?? "";
  const { filter, handleFilter } = useFilter();

  useEffect(() => {
    if (keywordFromURL && filter.keyword !== keywordFromURL) {
      handleFilter({
        target: {
          name: "keyword",
          value: keywordFromURL,
        },
      });
    }
  }, [keywordFromURL]);

  return null;
};

export default KeywordInitializer;
