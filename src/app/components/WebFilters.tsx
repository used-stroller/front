import React from 'react'
import styles from '@/styles/page.module.css'
import Image from 'next/image'

export const brandList: string[] = [
  'ALL',
  'RYAN',
  '오이스터',
  '부가부',
  '타보',
  '스토케',
  '에그',
  '와이업',
  '잉글레시나',
  '씨투엠뉴',
  '실버크로스',
  '오르빗베이비',
  'SEEC',
  '다이치',
  '싸이벡스',
  '뉴나',
  '엔픽스'
]

export const priceList = [
  { key: 'ALL', minPrice: '', maxPrice: '' },
  { key: '0~10만원', minPrice: 0, maxPrice: 100000 },
  { key: '10만원~30만원', minPrice: 100000, maxPrice: 300000 },
  { key: '30만원~50만원', minPrice: 300000, maxPrice: 500000 },
  { key: '50만원이상', minPrice: 500000, maxPrice: '' }
]

export const periodList = [
  { key: 'ALL', value: '' },
  { key: '1일', value: 1 },
  { key: '3일', value: 3 },
  { key: '일주일', value: 7 },
  { key: '한달', value: 30 }
]

export const sourceTypeList = [
  { key: 'ALL', value: '' },
  { key: '네이버', value: 'NAVER' },
  { key: '당근', value: 'CARROT' },
  { key: '번개장터', value: 'BUNJANG' },
  { key: '세컨웨어', value: 'HELLO' },
  { key: '중고나라', value: 'JUNGGO' }
]

const WebFilters = ({ filter, handleFilter, minMaxPrice }): JSX.Element => {
  const [activeBrand, setActiveBrand] = React.useState('ALL')
  const [activePrice, setActivePrice] = React.useState('ALL')
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(0)
  const [activeRegion, setActiveRegion] = React.useState('')
  const [activePeriod, setActivePeriod] = React.useState('ALL')
  const [activeSourceType, setActiveSourceType] = React.useState('ALL')

  const handleBrand = (value: React.SetStateAction<string>): void => {
    setActiveBrand(value)
    handleFilter({
      target: {
        name: 'brand',
        value: value === 'ALL' ? '' : value
      }
    })
  }

  const handlePrice = (price): void => {
    setActivePrice(price.key)
    setMinPrice(price.minPrice)
    setMaxPrice(price.maxPrice)
    minMaxPrice(price.minPrice, price.maxPrice)
  }

  const handleMinPrice = (ev): void => {
    setMinPrice(Number(ev.target.value))
  }

  const handleMaxPrice = (ev): void => {
    setMaxPrice(Number(ev.target.value))
  }

  const handlePeriod = (period): void => {
    setActivePeriod(period.key)
    handleFilter({
      target: {
        name: 'period',
        value: period.value === 'ALL' ? '' : period.value
      }
    })
  }

  const handleSourceType = (sourceType): void => {
    setActiveSourceType(sourceType.key)
    handleFilter({
      target: {
        name: 'sourceType',
        value: sourceType.value === 'ALL' ? '' : sourceType.value
      }
    })
  }

  const handleRegion = (ev): void => {
    setActiveRegion(ev.target.value)
  }

  const searchRegion = (): void => {
    handleFilter({
      target: {
        name: 'region',
        value: activeRegion
      }
    })
  }

  return (
    <div className={styles.filters_container}>
      <div className={styles.filters_wrapper}>
        <h3>브랜드</h3>
        <ul>
          {brandList.map((brand) => {
            return (
              <li
                className={`${styles.filter} ${
                  activeBrand === brand ? styles.active : ''
                }`}
                key={brand}
                onClick={() => { handleBrand(brand) }}
              >
                {brand}
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>가격</h3>
        <ul>
          {priceList.map((price) => {
            return (
              <li
                className={`${styles.filter} ${
                  activePrice === price.key ? styles.active : ''
                }`}
                key={price.key}
                onClick={() => { handlePrice(price) }}
              >
                {price.key}
              </li>
            )
          })}
          <div className={styles.price_wrapper}>
            직접입력
            <input
              type='number'
              name='minPrice'
              id='minPrice'
              placeholder='최소가격'
              value={minPrice}
              onChange={handleMinPrice}
            />
            ~
            <input
              type='number'
              name='maxPrice'
              id='maxPrice'
              placeholder='최대가격'
              value={maxPrice}
              onChange={handleMaxPrice}
            />
            <label htmlFor='min_price'
                   className={styles.filter_inner_button}
                   onClick={() => {
                     if (maxPrice < minPrice) {
                       alert('최소가격보다 큰 값을 입력해주세요')
                       return
                     }
                     minMaxPrice(minPrice, maxPrice)
                   }}>
              <Image
                src='/images/filter_inner_search_button.svg'
                alt='filter search button'
                width={13}
                height={13}
              />
            </label>
          </div>
        </ul>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>동네</h3>
        <div className={styles.search_region}>
          <input type='text'
                 name='region'
                 placeholder='동네검색'
                 value={activeRegion || ''}
                 onChange={handleRegion}
                 onKeyDown={(ev) => {
                   if (ev.key === 'Enter') {
                     searchRegion()
                   }
                 }}
          />
          <label htmlFor='region' className={styles.filter_inner_button} onClick={searchRegion}>
            <Image
              src='/images/filter_inner_search_button.svg'
              alt='filter search button'
              width={13}
              height={13}
            />
          </label>
        </div>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>가격</h3>
        <ul>
          {periodList.map((period) => {
            return (
              <li
                className={`${styles.filter} ${
                  activePeriod === period.key ? styles.active : ''
                }`}
                key={period.key}
                onClick={() => { handlePeriod(period) }}
              >
                {period.key}
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>사이트별</h3>
        <ul>
          {sourceTypeList.map((sourceType) => {
            return (
              <li
                className={`${styles.filter} ${
                  activeSourceType === sourceType.key ? styles.active : ''
                }`}
                key={sourceType.key}
                onClick={() => { handleSourceType(sourceType) }}
              >
                {sourceType.key}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default WebFilters
