'use client'
import React, {useState, useEffect,useRef, useContext} from 'react';
import styles from '@/styles/page.module.css'
import FilterContext from '../context/contextApi';

const SearchBarFilter = () => {

const [ searchInput, setSearchInput] = useState({});
const [ page,setPage] = useState(0)

  return (
        <FilterContext.Consumer>
          {state => (
            <>
            <div className={styles.search_bar}>
        <input 
          placeholder='입력하세요'
          onChange={(e) => state.setFilter({keyword:e.target.value})}
          />
        <img src="/images/search_button.png" 
             className={styles.search_button}
            //  onClick={getProductData}
             />
      </div>
      <div className={styles.filter_container}>
        <ul>
          <li className={styles.filter_title}>
            <select className={styles.filter_detail}>
              <option value="브랜드">브랜드</option>
              <option value="yoyo">RYAN</option>
              <option value="yoyo">오이스터</option>
              <option value="yoyo">부가부</option>
              <option value="yoyo">타보</option>
              <option value="yoyo">스토케</option>
              <option value="yoyo">에그</option>
              <option value="yoyo">와이업</option>
              <option value="yoyo">잉글레시나</option>
              <option value="yoyo">씨투엠뉴</option>
              <option value="yoyo">실버크로스</option>
              <option value="yoyo">오르빗베이비</option>
              <option value="yoyo">SEEC</option>
              <option value="yoyo">다이치</option>
              <option value="yoyo">싸이벡스</option>
              <option value="yoyo">뉴나</option>
              <option value="yoyo">엔픽스</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select className={styles.filter_detail}>
              <option value="dd">가격</option>
              <option value="dd">0~10만원</option>
              <option value="dd">10만원~30만원</option>
              <option value="dd">30만원~50만원</option>
              <option value="dd">50만원이상</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select>
              <option value="">동네</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select>
              <option value="">기간</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select>
              <option value="">사이트별</option>
              <option value="">당근</option>
              <option value="">중고나라</option>
              <option value="">번개장터</option>
              <option value="">세컨웨어</option>
            </select>
          </li>
        </ul>
      </div>
      </>
          )}
      </FilterContext.Consumer>
  )
}
export default SearchBarFilter;