'use client'

import styles from '@/styles/page.module.css'
import Image from 'next/image'
import WebFilters from './WebFilters'
import MobileFilters from './MobileFilters'
import { useFilter } from '@/app/context/FilterContext'
import React from 'react'

const SearchBarFilter = (): JSX.Element => {
  const { filter, handleFilter, initFilter, minMaxPrice } = useFilter()

  return (
    <>
    <div className={styles.header_wrapper}>
      <div className={styles.logo} onClick={initFilter}></div>
      <div className={styles.search_bar}>
        <input
          name='keyword'
          type='text'
          value={(filter.keyword) ? filter.keyword : ''}
          placeholder='검색어를 입력하세요'
          onChange={handleFilter}
        />
        <label htmlFor='keyword' className={styles.search_button}>
          <Image
            src='/images/search_button.svg'
            alt='search button'
            width={20}
            height={20}
          />
        </label>
      </div>
    </div>

    <WebFilters filter={filter} handleFilter={handleFilter} minMaxPrice={minMaxPrice} />
    <MobileFilters filter={filter} handleFilter={handleFilter} minMaxPrice={minMaxPrice} />
    </>
  )
}
export default SearchBarFilter
