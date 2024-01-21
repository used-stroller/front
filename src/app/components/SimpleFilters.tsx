import React from 'react';
import styles from '@/styles/page.module.css';

const SimpleFilters = () => {
  return (
    <div className={styles.m_filters_container}>
      <ul>
        <li className={styles.filter_title}>
          <select className={styles.filter_detail}>
            <option value='브랜드'>브랜드</option>
            <option value='yoyo'>RYAN</option>
            <option value='yoyo'>오이스터</option>
            <option value='yoyo'>부가부</option>
            <option value='yoyo'>타보</option>
            <option value='yoyo'>스토케</option>
            <option value='yoyo'>에그</option>
            <option value='yoyo'>와이업</option>
            <option value='yoyo'>잉글레시나</option>
            <option value='yoyo'>씨투엠뉴</option>
            <option value='yoyo'>실버크로스</option>
            <option value='yoyo'>오르빗베이비</option>
            <option value='yoyo'>SEEC</option>
            <option value='yoyo'>다이치</option>
            <option value='yoyo'>싸이벡스</option>
            <option value='yoyo'>뉴나</option>
            <option value='yoyo'>엔픽스</option>
          </select>
        </li>
        <li className={styles.filter_title}>
          <select className={styles.filter_detail}>
            <option value='dd'>가격</option>
            <option value='dd'>0~10만원</option>
            <option value='dd'>10만원~30만원</option>
            <option value='dd'>30만원~50만원</option>
            <option value='dd'>50만원이상</option>
          </select>
        </li>
        <li className={styles.filter_title}>
          <select>
            <option value=''>동네</option>
          </select>
        </li>
        <li className={styles.filter_title}>
          <select>
            <option value=''>기간</option>
          </select>
        </li>
        <li className={styles.filter_title}>
          <select>
            <option value=''>사이트별</option>
            <option value=''>당근</option>
            <option value=''>중고나라</option>
            <option value=''>번개장터</option>
            <option value=''>세컨웨어</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default SimpleFilters;
