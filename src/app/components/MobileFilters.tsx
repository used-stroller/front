import React, { useState } from 'react'
import styles from '@/styles/page.module.css'
import { brandList, periodList, priceList, sourceTypeList } from '@/app/components/WebFilters'
import ModalTown from './ModalTown'

const MobileFilters = ({ filter, handleFilter, minMaxPrice}): JSX.Element => {
  const [activePrice, setActivePrice] = React.useState('ALL')
  const handlePrice = (ev) => {
    setActivePrice(ev.target.value)
    const { minPrice, maxPrice } = priceList.find((price) => price.key === ev.target.value)
    minMaxPrice(minPrice, maxPrice)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [town, setTown] = useState('')
  const openModal = () => { setIsModalOpen(true) }
  const closeModal = () => { setIsModalOpen(false) }

  return (
    <div className={styles.m_filters_container}>
      <ul>
        <li className={styles.filter_title}>
          <select name={'brand'} value={filter.brand} onChange={handleFilter}>
            {brandList.map((brand) => (
              <option key={brand} value={brand === 'ALL' ? '' : brand}>{brand === 'ALL' ? '브랜드' : brand}</option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title}>
          <select name={'minPrice'} value={activePrice} onChange={handlePrice}>
            {priceList.map((price) => (
              <option key={price.key} value={price.key}>{price.key === 'ALL' ? '가격' : price.key}</option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title} id={'town'}>
          <label htmlFor='town'onClick={openModal}>동네</label>
          <input name={'town'} type={'text'} onChange={handleFilter} />
          <ModalTown isOpen={isModalOpen} closeModal={closeModal} handleFilter={handleFilter} />
        </li>
        <li className={styles.filter_title}>
          <select name={'period'} value={filter.period} onChange={handleFilter}>
            {periodList.map((period) => (
              <option key={period.key} value={period.value}>{period.key === 'ALL' ? '기간' : period.key}</option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title}>
          <select name={'sourceType'} value={filter.sourceType} onChange={handleFilter}>
            {sourceTypeList.map((sourceType) => (
              <option key={sourceType.key} value={sourceType.value}>{sourceType.key === 'ALL' ? '사이트별' : sourceType.key}</option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  )
}

export default MobileFilters
