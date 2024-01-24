<<<<<<< HEAD
'use client'
import styles from '../styles/page.module.css'
import { getProductList } from '@/utils/getProductList';
import SourceImage from './components/SourceImage';
import FormattedPrice from './components/FormattedPrice';
import Link from 'next/link';
import SearchBarFilter from './components/SearchBarFilter';
import FilterContext from './context/contextApi';
import { useState } from 'react';
import InfinityScroll from './components/InfinityScroll';

export default async function Home() {

const [filter,setFilter] = useState({keyword:''})
const productList= await getProductList(0,filter)

  return(
  <>
  <FilterContext.Provider value={{filter: filter,setFilter: setFilter}}>
  <div className='main'>
       <div className={styles.logo_box}>
        <img className={styles.logo_image} src="/images/logo.png"/>
      </div>
      <SearchBarFilter></SearchBarFilter>
      <div>
        <div>
          <span className={styles.keyword}>스토케</span>
          <span>검색결과</span>
          <span className={styles.result_qty}>123</span>
          <span>개</span>
        </div>
        <div className={styles.second_filter}>
          <button>최신순</button>
          <button>저가순</button>
          <button>고가순</button>
=======
import styles from '../styles/page.module.css';
import { getProductList } from '@/utils/productUtils';
import Link from 'next/link';
import Image from 'next/image';
import Product from './components/Product';
import type { FilterReq } from './types';
import ProductList from './components/InfinityScroll';
import SearchBarFilter from './components/SearchBarFilter';
import Footer from './components/Footer';

export default async function Home(): Promise<JSX.Element> {
  const filter: FilterReq = {
    page: 0,
    size: 20,
  };
  const productList = await getProductList(filter);

  return (
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
>>>>>>> 30c97b8a384481403c82831916638b02252131f6
        </div>
        <div className={styles.ad_banner}>
          <Link href={''} className={styles.ad_banner_link}>
            <Image src='/images/ad_example.jpg' alt='ads' fill priority />
          </Link>
        </div>
        <div className={styles.product_list_container}>
<<<<<<< HEAD
              {productList.content.map(product=>(
          <div key={product.id} className={styles.product}>
          <div className={styles.product_img}>
          <Link href={product.link}>
            <img src={product.imgSrc} className={styles.image}/>
            </Link>
            <SourceImage source={product.sourceType}></SourceImage>
          </div>
          <div className={styles.title_price_div}>
            <span className={styles.title}>{product.title}</span>
            <FormattedPrice value={product.price}></FormattedPrice>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.address_date_div}>
            <span className={styles.icon_map}><img src="/images/icon_map.png"/></span>
            <span className={styles.address}>{product.address}</span>
            <span className={styles.uploadDate}>3주전</span>
          </div>
        </div>
             ))}
            {/* <InfinityScroll></InfinityScroll> */}
=======
          {productList.content.map((product) => (
            <Product content={product} key={product.id} />
          ))}
          <ProductList />
>>>>>>> 30c97b8a384481403c82831916638b02252131f6
        </div>
       
      </div>

      <Footer />
    </div>
<<<<<<< HEAD
    </FilterContext.Provider>
  </>
  )
=======
  );
>>>>>>> 30c97b8a384481403c82831916638b02252131f6
}
