"use client";

import WebFilters from "./WebFilters";
import MobileFilters from "./MobileFilters";
import { useFilter } from "@/context/FilterContext";
import React, { type ReactElement } from "react";

const SearchBarFilter = (): ReactElement => {
  const { filter, handleFilter, minMaxPrice, reset } = useFilter();

  return (
    <>
      <WebFilters
        filter={filter}
        handleFilter={handleFilter}
        minMaxPrice={minMaxPrice}
        reset={reset}
      />
      <MobileFilters
        filter={filter}
        handleFilter={handleFilter}
        minMaxPrice={minMaxPrice}
        reset={reset}
      />
    </>
  );
};
export default SearchBarFilter;
