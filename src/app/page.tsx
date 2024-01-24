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
        </div>
        <div className={styles.ad_banner}>
          <img src="/images/ad_example.png"></img>
        </div>
        <div className={styles.product_list_container}>
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
        </div>
       
      </div>
    </div>
    </FilterContext.Provider>
  </>
  )
}
