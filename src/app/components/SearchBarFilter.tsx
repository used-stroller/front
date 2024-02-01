'use client'

import styles from '@/styles/page.module.css'
import Image from 'next/image'
import WebFilters from './WebFilters'
import MobileFilters from './MobileFilters'
import { useFilter } from '@/app/context/FilterContext'
import React from 'react'

const SearchBarFilter = (): JSX.Element => {
  const { filter, handleFilter, minMaxPrice, reset } = useFilter()
  const [keyword, setKeyword] = React.useState('')
  const handleKeyword = (ev) => {
    setKeyword(ev.target.value)
  }
  const handleSearch = () => {
    handleFilter({
      target: {
        name: 'keyword',
        value: keyword
      }
    })
  }

  return (
    <>
    <div className={styles.header_wrapper}>
      <div className={styles.logo} onClick={() => { window.location.reload() }}></div>
      <div className={styles.search_bar}>
        <input
          name='keyword'
          type='text'
          value={keyword || ''}
          placeholder='검색어를 입력하세요'
          onChange={handleKeyword}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <label htmlFor='keyword' className={styles.search_button} onClick={handleSearch}>
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
    <MobileFilters filter={filter} handleFilter={handleFilter} minMaxPrice={minMaxPrice} reset={reset}/>
    </>
  )
}
export default SearchBarFilter
