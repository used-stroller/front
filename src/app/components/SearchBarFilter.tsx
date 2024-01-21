'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/page.module.css';
import { getProductList } from '@/utils/productUtils';
import Image from 'next/image';
import Filters from './Filters';
import SimpleFilters from './SimpleFilters';

interface Props {
  filterReq: FilterReq;
}

export interface FilterReq {
  keyword: string;
  sourceType: sourceType;
  minPrice: number;
  maxPrice: number;
  town: string;
  period: number;
  model: string[];
  brand: string[];
}
export enum sourceType {
  NAVER = 'NAVER',
  CARROT = 'CARROT',
  HELLO = 'HELLO',
  BUNJANG = 'BUNJANG',
  JUNGGO = 'JUNGGO',
}

const SearchBarFilter = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState({});
  const [page, setPage] = useState(0);
  const searchItems = (searchValue: FilterReq) => {
    setSearchInput(searchValue);
    console.log(searchInput);
  };

  async function getProductData(page: number): Promise<Response> {
    const productList = await getProductList(0);
    console.log(productList);
    return productList;
  }

  return (
    <>
      <div className={styles.header_wrapper}>
        <div className={styles.logo}></div>
        <div className={styles.search_bar}>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            onChange={(e) => searchItems(e.target.value)}
          />
          <Image
            src='/images/search_button.svg'
            className={styles.search_button}
            alt='search button'
            width={20}
            height={20}
            onClick={getProductData}
          />
        </div>
      </div>

      <Filters />
      <SimpleFilters />
    </>
  );
};
export default SearchBarFilter;
