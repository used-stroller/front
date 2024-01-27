'use client'
import styles from '@/styles/page.module.css'
import { useEffect, useState } from 'react'
import { useFilter } from '@/app/context/FilterContext'
import { type ProductRes } from '@/app/types'
import { getProductList } from '@/utils/productUtils'
import Product from '@/app/components/Product'

const ProductList = (): JSX.Element => {
  const { filter, handleFilter } = useFilter()
  const [productList, setProductList] = useState({} as ProductRes)

  useEffect(() => {
    console.log('========> filter: ', filter)
    getProductList(filter).then((res) => {
      console.log('========> res: ', res)
      if (res) {
        setProductList(res)
      }
    })
  }, [filter])

  return (
    <div className={styles.product_container}>
        {productList.content?.map((product) => (
            <Product content={product} key={product.id}/>
        ))}
       {/* /!* <InfinityScroll/> *!/ */}
    </div>
  )
}

export default ProductList
