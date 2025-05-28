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

// 필터 컨텍스트에서 filter 상태와 setFilter 함수를 가져오는 커스텀 훅
const useFilter = (): FilterContextType => {
  const [filter, setFilter] = React.useContext(FilterContext);

  /**
   * 공통 필터 업데이트 핸들러
   * - 이벤트 객체처럼 { target: { name, value } } 형태로 호출됨
   * - filter 상태를 업데이트하고, GA/GTM 이벤트를 전송함
   *
   * @param ev - 필터 대상과 값을 담은 객체 (이벤트 유사 객체)
   */
  const handleFilter = useCallback(
    (ev: {
      target: { name: string; value: string | string[] | number };
    }): void => {
      const { name, value } = ev.target;

      // 기존 filter 상태를 복사하고 해당 name 필드를 업데이트
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));

      // Google Analytics 이벤트 전송 (선택된 필터 정보를 기록)
      sendGAEvent({ event: name, value });

      // Google Tag Manager 이벤트 전송 (선택된 필터 정보를 기록)
      sendGTMEvent({ event: name, value });
    },
    [setFilter], // setFilter가 변경될 경우만 콜백 재생성
  );

  // 반환값은 필터 상태와 컨트롤 함수들
  return {
    filter,
    handleFilter,
    // 아래 항목들은 외부에서 context에 정의된 함수들이라고 가정
    minMaxPrice,
    reset,
    resetAllFilters,
  };
};

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
    sort: "",
  }); // 필터 초기 상태로 리셋

  return { filter, handleFilter, minMaxPrice, reset, resetAllFilters };
};

export { FilterProvider, useFilter };
