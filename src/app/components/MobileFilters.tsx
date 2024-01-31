import React, { useState } from 'react'
import styles from '@/styles/page.module.css'
import { brandList, priceList } from '@/app/components/WebFilters'
import ModalTown from './ModalTown'

const MobileFilters = ({ filter, handleFilter, minMaxPrice, inputTown}): JSX.Element => {
  const [activePrice, setActivePrice] = React.useState('ALL')
  const handlePrice = (ev) => {
    console.log('========', ev)
    const { minPrice, maxPrice } = activePrice
    minMaxPrice(minPrice, maxPrice)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [town, setTown] = useState('')
  const openModal = () => { setIsModalOpen(true) }
  const closeModal = () => { 
    setIsModalOpen(false) 
    setTown(filter.town)
  }

  return (
    <div className={styles.m_filters_container}>
      <ul>
        <li className={styles.filter_title}>
          <select name={'brand'} value={filter.brand} onChange={handleFilter}>
            {brandList.map((brand) => (
              <option value={brand === 'ALL' ? '' : brand}>{brand === 'ALL' ? '브랜드' : brand}</option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title}>
          <select name={'minPrice'} value={filter.minPrice} onChange={handlePrice}>
            {priceList.map((price) => (
              <option value={price.key}>{price.key === 'ALL' ? '가격' : price.key}</option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title} id={'town'}>
          <label htmlFor='town' onClick={openModal}>동네</label>
          <input type="text" value={town}/>
          <ModalTown isOpen={isModalOpen} closeModal={closeModal}/>
          <input name={'town'} type={'text'} value={filter.town} onChange={handleFilter}/>
        </li>
        <li className={styles.filter_title}>
          <select name={'period'} value={filter.period} onChange={handleFilter}>
            <option value=''>기간</option>
            <option value='1'>1일</option>
            <option value='3'>3일</option>
            <option value='7'>일주일</option>
            <option value='30'>한달</option>
          </select>
        </li>
        <li className={styles.filter_title}>
          <select name={'sourceType'} value={filter.sourceType} onChange={handleFilter}>
            <option value=''>사이트별</option>
            <option value='NAVER'>네이버</option>
            <option value='CARROT'>당근</option>
            <option value='BUNJANG'>번개장터</option>
            <option value='HELLO'>세컨웨어</option>
            <option value='JUNGGO'>중고나라</option>
          </select>
        </li>
      </ul>
    </div>
  )
}

export default MobileFilters
