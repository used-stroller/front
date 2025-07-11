"use client";

import React, { type ReactElement, useCallback } from "react";
import {
  type FilterAction,
  type FilterContextType,
  type FilterProviderProps,
  type FilterReq,
  type MinMaxPrice,
} from "@/types";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

// 1. Context 생성
const FilterContext = React.createContext<[FilterReq, FilterAction]>([
  {},
  () => {},
]);

// 2. Provider 정의
const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
}): ReactElement => {
  const [filter, setFilter] = React.useState<FilterReq>({
    page: 0,
    region: "",
  });

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {children}
    </FilterContext.Provider>
  );
};

// 3. useFilter 커스텀 훅
const useFilter = (): FilterContextType => {
  const [filter, setFilter] = React.useContext(FilterContext);

  const handleFilter = useCallback(
    (ev: {
      target: { name: string; value: string | string[] | number };
    }): void => {
      const { name, value } = ev.target;
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));
      sendGAEvent({ event: name, value });
      sendGTMEvent({ event: name, value });
    },
    [setFilter],
  );

  const minMaxPrice = useCallback(
    ({ key, minPrice, maxPrice }: MinMaxPrice): void => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        minPrice,
        maxPrice,
      }));
    },
    [setFilter],
  );

  const reset = useCallback(
    (name: string): void => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: "",
      }));
    },
    [setFilter],
  );

  const resetAllFilters = useCallback((): void => {
    setFilter({
      keyword: "",
      sourceType: [],
      minPrice: "",
      maxPrice: "",
      region: "",
      defaultRegion: "",
      period: 0,
      model: [],
      brand: [],
      page: 0,
      size: 20,
      sort: "",
    });
  }, [setFilter]);

  return {
    filter,
    handleFilter,
    minMaxPrice,
    reset,
    resetAllFilters,
  };
};

export { FilterProvider, useFilter };
