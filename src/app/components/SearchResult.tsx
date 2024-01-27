'use client'
import styles from '@/styles/page.module.css'
import { useState } from 'react'
import { useFilter } from '@/app/context/FilterContext'

const SearchResult = (): JSX.Element => {
  const { filter, handleFilter } = useFilter()
  console.log('SearchResult: ', filter)
  const [second, setSecond] = useState('최신순')
  const handleSecondFilter = (ev) => {
    setSecond(ev.target.innerText)
    handleFilter(
      {
        target: {
          name: 'sort',
          value: ev.target.value
        }
      }
    )
  }
  return (
    <div className={styles.search_result_wrapper}>
      <div className={styles.search_result}>
        <span className={styles.keyword}>스토케</span>
        검색결과 <span className={styles.result_qty}>12345</span> 개
      </div>
      <div className={styles.second_filter}>
        <button onClick={handleSecondFilter}
                className={second === '최신순' && styles.active}
                value={'updateDate,desc'}
        >최신순</button>
        <button onClick={handleSecondFilter}
                className={second === '저가순' && styles.active}
                value={'price,asc'}
        >저가순</button>
        <button onClick={handleSecondFilter}
                className={second === '고가순' && styles.active}
                value={'price,desc'}
        >고가순</button>
      </div>
    </div>
  )
}

export default SearchResult
