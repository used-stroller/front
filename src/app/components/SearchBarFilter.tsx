'use client'

import styles from '@/styles/page.module.css'
import Image from 'next/image'
import WebFilters from './WebFilters'
import MobileFilters from './MobileFilters'
import { useFilter } from '@/app/context/FilterContext'

const SearchBarFilter = ({ }): JSX.Element => {
  const { filter, handleFilter } = useFilter()
  console.log('SearchBarFilter: ', filter)

  return (
    <>
    <div className={styles.header_wrapper}>
      <div className={styles.logo}></div>
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

    <WebFilters filter={filter} handleFilter={handleFilter} />
    <MobileFilters filter={filter} handleFilter={handleFilter}/>
    </>
  )
}
export default SearchBarFilter
