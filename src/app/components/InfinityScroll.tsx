'use client'

import React, { useEffect, useRef, useState } from 'react'
import Product from './Product'
import { getProductList } from '@/utils/productUtils'
import Image from 'next/image'
import { useFilter } from '@/app/context/FilterContext'

const InfinityScroll = ({ setResultCount }): JSX.Element => {
  const { filter, handleFilter } = useFilter()
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
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

  useEffect(() => {
    setProducts([])
    setHasMore(true)
    handleFilter({
      target: {
        name: 'page',
        value: 0
      }
    })
  }, [filter.keyword,
    filter.sourceType,
    filter.minPrice,
    filter.maxPrice,
    filter.region,
    filter.period,
    filter.model,
    filter.brand,
    filter.sort])

  async function fetchMoreItems () {
    const response = await getProductList(filter)
    setResultCount(response.totalElements)
    if (response.content.length === 0) {
      setHasMore(false)
    } else {
      setProducts((prevProducts) => [...prevProducts, ...response.content])
      handleFilter({
        target: {
          name: 'page',
          value: filter.page + 1
        }
      })
    }
  }

  return (
    <>
      {products?.map((product, index) => (
          <Product content={product} key={index}/>
      ))}
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          <Image
            src='/images/loading.svg'
            alt='loading'
            width={50}
            height={50}
          />
        </div>
      )}
    </>
  )
}

export default InfinityScroll
