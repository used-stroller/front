"use client";

import styles from "@/styles/page.module.css";
import Logo from "@/components/Logo";
import Image from "next/image";
import Menu from "@/components/Menu";
import React, { type ChangeEvent, useState } from "react";
import { useFilter } from "@/context/FilterContext";

const Header: React.FC = () => {
  const { handleFilter } = useFilter();
  const [keyword, setKeyword] = useState("");

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
  );
};

export default Header;
