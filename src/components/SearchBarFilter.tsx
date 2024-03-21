"use client";

import styles from "@/styles/page.module.css";
import Image from "next/image";
import WebFilters from "./WebFilters";
import MobileFilters from "./MobileFilters";
import { useFilter } from "@/context/FilterContext";
import React, { useEffect, type ChangeEvent, type ReactElement } from "react";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import ReactGA from "react-ga4";

ReactGA.initialize("G-B2KK9DNYZ1");


const SearchBarFilter = (): ReactElement => {
  useEffect(() => {
    ReactGA.send("pageview");
  }, []);
  const { filter, handleFilter, minMaxPrice, reset } = useFilter();
  const [keyword, setKeyword] = React.useState("");

  const handleKeyword = (ev: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(ev.target.value);
  };

  const handleSearch = (): void => {
    handleFilter({
      target: {
        name: "keyword",
        value: keyword,
      },
    });
  };

  return (
    <>
      <div className={styles.header_wrapper}>
        <Logo />
        <div className={styles.search_bar}>
          <input
            name="keyword"
            type="text"
            value={keyword}
            placeholder="검색어를 입력하세요"
            onChange={handleKeyword}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className={styles.search_button} onClick={handleSearch}>
            <Image
              src="./images/search_button.svg"
              alt="search button"
              width={20}
              height={20}
            />
          </button>
        </div>
        <Menu />
      </div>

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
