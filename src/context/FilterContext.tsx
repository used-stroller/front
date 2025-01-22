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

const FilterContext = React.createContext<[FilterReq, FilterAction]>([
  {},
  () => {},
]);

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

  const minMaxPrice = ({ key, minPrice, maxPrice }: MinMaxPrice): void => {
    setFilter((prevFilter) => ({ ...prevFilter, minPrice, maxPrice }));
  };

  const reset = (name: string): void => {
    setFilter((prevFilter) => ({ ...prevFilter, [name]: "" }));
  };

  const resetAllFilters = (): void => {
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
      size: 20, // 기본 페이지 크기 (필요에 따라 조정)
      sort: "",}); // 필터 초기 상태로 리셋
  };

  return { filter, handleFilter, minMaxPrice, reset, resetAllFilters };
};

export { FilterProvider, useFilter };
