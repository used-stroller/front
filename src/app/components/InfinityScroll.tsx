'use client';
import { getProductList } from '@/utils/productUtils';
import React, { useState, useEffect, useRef } from 'react';
import Product from './Product';

const ProductList = (): JSX.Element => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const elementRef = useRef(null);

  //callback 함수 정의
  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  }

  //product상태가 업데이트 될때 실행
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
  }, [products]); //products가 업데이트 될때마다 hook

  async function fetchMoreItems() {
    //fetch the next batch of products
    const filter = {
      page: page,
      size: 20,
    };
    const response = await getProductList({ filter });
    console.log(response);

    if (response.content.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...response.content]);
      setPage((prevPage) => prevPage + 1);
    }
  }
  return (
    <>
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
