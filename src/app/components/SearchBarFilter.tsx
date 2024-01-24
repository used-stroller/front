'use client';

import styles from '@/styles/page.module.css';
import Image from 'next/image';
import Filters from './Filters';
import SimpleFilters from './SimpleFilters';
import FilterContext from '../context/contextApi';

const SearchBarFilter = (): JSX.Element => {
  return (
    <FilterContext.Consumer>
      {state =>( 
      <>
      <div className={styles.header_wrapper}>
        <div className={styles.logo}></div>
        <div className={styles.search_bar}>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            onChange={(e) => state.setFilter({keyword:e.target.value})}
          />
          <Image
            src='/images/search_button.svg'
            className={styles.search_button}
            alt='search button'
            width={20}
            height={20}
          />
        </div>
      </div>

      <Filters />
      <SimpleFilters />
      </>)}
    </FilterContext.Consumer>
  );
};
export default SearchBarFilter;
