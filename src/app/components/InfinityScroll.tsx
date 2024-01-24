<<<<<<< HEAD
'use client'
import { getProductList } from '@/utils/getProductList';
import React, {useState, useEffect,useRef, useContext} from 'react';
import styles from '@/styles/page.module.css'
import Link from 'next/link'
import SourceImage from './SourceImage';
import FormattedPrice from './FormattedPrice';
import FilterContext from '../context/contextApi';

const InfinityScroll = () => {

  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page,setPage] = useState(1)
  const elementRef = useRef(null)
  const filter = useContext(FilterContext)
  console.log("인피티니필터")
  console.log(filter)

  //callback 함수 정의 
  function onIntersection(entries){
    const firstEntry = entries[0]
    if(firstEntry.isIntersecting && hasMore) {
      fetchMoreItems()
    }
  }

  //product상태가 업데이트 될때 실행 
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current){
      observer.observe(elementRef.current)
    }

    return () => {
      if(observer){
        observer.disconnect()
      }
    }
  },[products]) //products가 업데이트 될때마다 hook
  
  async function fetchMoreItems(){
    
     //fetch the next batch of products 
    const response = await getProductList(page, filter.filter)
    console.log("infinit filter")
    console.log(filter)
    console.log(response)
    if(response.content.length ==0){
      setHasMore(false)
    }
    else{
      setProducts(prevProducts => [...prevProducts, ...response.content])
      setPage(prevPage=>prevPage+1)
=======
'use client';
import { getProductList } from '@/utils/productUtils';
import React, { useState, useEffect, useRef } from 'react';
import Product from './Product';
import type { FilterReq } from '../types';

const ProductList = (filter: FilterReq): JSX.Element => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const elementRef = useRef(null);

  // callback 함수 정의
  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  }

  // product상태가 업데이트 될때 실행
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [products]); // products가 업데이트 될때마다 hook

  async function fetchMoreItems() {
    // fetch the next batch of products
    const filter: FilterReq = {
      page,
    };
    const response = await getProductList(filter);
    console.log(response);

    if (response.content.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...response.content]);
      setPage((prevPage) => prevPage + 1);
>>>>>>> 30c97b8a384481403c82831916638b02252131f6
    }
  }
  return (
    <>
<<<<<<< HEAD
      {
        products&&products.map(product => 
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
          )
      }
      {hasMore && 
        <div ref={elementRef} style={{textAlign:'center'}}>불러오는 중..</div>
      }
    </>
  )
}

export default InfinityScroll;
=======
      {products &&
        products.map((product) => (
          <Product content={product} key={product.id} />
        ))}
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          불러오는 중..
        </div>
      )}
    </>
  );
};

export default ProductList;
>>>>>>> 30c97b8a384481403c82831916638b02252131f6
