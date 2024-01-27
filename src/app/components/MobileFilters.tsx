import React from 'react'
import styles from '@/styles/page.module.css'

const MobileFilters = ({ filter, handleFilter }) => {
  console.log('MobileFilters: ', filter)

  return (
    <div className={styles.m_filters_container}>
      <ul>
        <li className={styles.filter_title}>
          <select name={'brand'} value={filter.brand} onChange={handleFilter}>
            <option value=''>브랜드</option>
            <option value='RYAN'>RYAN</option>
            <option value='오이스터'>오이스터</option>
            <option value='부가부'>부가부</option>
            <option value='타보'>타보</option>
            <option value='스토케'>스토케</option>
            <option value='에그'>에그</option>
            <option value='와이업'>와이업</option>
            <option value='잉글레시나'>잉글레시나</option>
            <option value='씨투엠뉴'>씨투엠뉴</option>
            <option value='실버크로스'>실버크로스</option>
            <option value='오르빗베이비'>오르빗베이비</option>
            <option value='SEEC'>SEEC</option>
            <option value='다이치'>다이치</option>
            <option value='싸이벡스'>싸이벡스</option>
            <option value='뉴나'>뉴나</option>
            <option value='엔픽스'>엔픽스</option>
          </select>
        </li>
        <li className={styles.filter_title}>
          <select name={'minPrice'} value={filter.minPrice} onChange={handleFilter}>
            <option value=''>가격</option>
            <option value='0'>0~10만원</option>
            <option value='10'>10만원~30만원</option>
            <option value='30'>30만원~50만원</option>
            <option value='50'>50만원이상</option>
          </select>
        </li>
        <li className={styles.filter_title} id={'town'}>
          <lable htmlFor='town'>동네</lable>
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
