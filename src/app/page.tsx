'use client'
import styles from '../styles/page.module.css';

import Link from 'next/link';
import Image from 'next/image';
import Product from './components/Product';
import ProductList from './components/InfinityScroll';
import SearchBarFilter from './components/SearchBarFilter';
import Footer from './components/Footer';
import FilterContext from './context/contextApi';
import { getProductList } from '@/utils/getProductList';
import { useState } from 'react';
import InfinityScroll from './components/InfinityScroll';

export default async function Home(): Promise<JSX.Element> {

  const [filter,setFilter] = useState({keyword:''})
  const productList= await getProductList(0,filter)

  return (
    <FilterContext.Provider value={{filter:filter,setFilter:setFilter}}>
    <div className='main'>
      <SearchBarFilter />

      <div className={styles.contents}>
        <div className={styles.search_result_wrapper}>
          <div className={styles.search_result}>
            <span className={styles.keyword}>스토케</span>
            검색결과 <span className={styles.result_qty}>12345</span> 개
          </div>
          <div className={styles.second_filter}>
            <button className={styles.second_filter_active}>최신순</button>
            <button>저가순</button>
            <button>고가순</button>
          </div>
        </div>
        <div className={styles.ad_banner}>
          <Link href={''} className={styles.ad_banner_link}>
            <Image src='/images/ad_example.jpg' alt='ads' fill priority />
          </Link>
        </div>
        <div className={styles.product_list_container}>
          {productList.content.map((product) => (
            <Product content={product} key={product.id} />
          ))}
          <InfinityScroll />
        </div>
      </div>
      <Footer />
    </div>
    </FilterContext.Provider>
  );
}
