'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import Product from './Product'
import FilterContext from '../context/FilterContext'
import { getProductList } from '@/utils/getProductList'

const InfinityScroll = (): JSX.Element => {
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const filter = useContext(FilterContext)
  console.log('인피니티필터')
  console.log(filter)

  const elementRef = useRef(null)

  // callback 함수 정의
  function onIntersection (entries) {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems()
    }
  }

  // product상태가 업데이트 될때 실행
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [products]) // products가 업데이트 될때마다 hook

  async function fetchMoreItems () {
    // fetch the next batch of products
    const response = await getProductList(page, filter.filter)
    console.log(response)

    if (response.content.length === 0) {
      setHasMore(false)
    } else {
      setProducts((prevProducts) => [...prevProducts, ...response.content])
      setPage((prevPage) => prevPage + 1)
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
  )
}

export default InfinityScroll
