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
  // const { location, error, loading, refresh } = useGeolocation();
  // const [defaultRegion, setDefaultRegion] = React.useState<string>();
  //
  // useEffect(() => {
  //   if (location.longitude !== null && location.latitude !== null) {
  //     getLocation(location.longitude, location.latitude).then((response) => {
  //       const locations = [...response].join(",");
  //       console.log("위치: ", locations);
  //       setDefaultRegion(locations);
  //     });
  //   }
  // }, [location]);

  const handleFilter = useCallback(
    (ev: {
      target: { name: string; value: string | string[] | number };
    }): void => {
      const { name, value } = ev.target;
      // if (filter.region !== undefined && filter.region?.length > 0) {
      //   console.log("동네 검색: ", name, value);
      //   setFilter((prevFilter) => ({
      //     ...prevFilter,
      //     defaultRegion,
      //     [name]: value,
      //   }));
      // } else {
      console.log(
        "기본 검색: ",
        name,
        value,
        filter.region,
        " | 현재위치: ",
        // defaultRegion,
      );
      setFilter((prevFilter) => ({
        ...prevFilter,
        // defaultRegion,
        [name]: value,
      }));
      // }
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

  return { filter, handleFilter, minMaxPrice, reset };
};

export { FilterProvider, useFilter };
