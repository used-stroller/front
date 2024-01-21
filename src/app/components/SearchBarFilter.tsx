'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/page.module.css';
import { getProductList } from '@/utils/productUtils';
import Image from 'next/image';
import Filters from './Filters';
import SimpleFilters from './SimpleFilters';
import type { FilterReq, Response } from '../types';

const SearchBarFilter = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const searchItems = (searchValue: string): void => {
    setKeyword(searchValue);
    console.log(keyword);
  };

  async function getProductData(): Promise<Response> {
    const filter: FilterReq = {
      keyword,
    };
    const productList = await getProductList(filter);
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
