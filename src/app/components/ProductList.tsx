'use client'
import styles from '@/styles/page.module.css'
import InfinityScroll from '@/app/components/InfinityScroll'
import SearchResult from '@/app/components/SearchResult'
import Ad from '@/app/components/Ad'
import React, { useState } from 'react'

const ProductList = (): JSX.Element => {
  const [resultCount, setResultCount] = useState([])

  return (
    <div>
      <SearchResult resultCount={resultCount} />
      <Ad />
      <div className={styles.product_container}>
        <InfinityScroll setResultCount={setResultCount} />
      </div>
    </div>

  )
}

export default ProductList
