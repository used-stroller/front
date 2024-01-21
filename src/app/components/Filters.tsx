import React from 'react';
import styles from '@/styles/page.module.css';
import Image from 'next/image';

const Filters = (): JSX.Element => {
  return (
    <div className={styles.filters_container}>
      <div className={styles.filters_wrapper}>
        <h3>브랜드</h3>
        <ul>
          <li className={`${styles.filter} ${styles.active}`}>ALL</li>
          <li className={styles.filter}>RYAN</li>
          <li className={styles.filter}>오이스터</li>
          <li className={styles.filter}>부가부</li>
          <li className={styles.filter}>타보</li>
          <li className={styles.filter}>스토케</li>
          <li className={styles.filter}>에그</li>
          <li className={styles.filter}>와이업</li>
          <li className={styles.filter}>잉글레시나</li>
          <li className={styles.filter}>씨투엠뉴</li>
          <li className={styles.filter}>실버크로스</li>
          <li className={styles.filter}>오르빗베이비</li>
          <li className={styles.filter}>SEEC</li>
          <li className={styles.filter}>다이치</li>
          <li className={styles.filter}>싸이벡스</li>
          <li className={styles.filter}>뉴나</li>
          <li className={styles.filter}>엔픽스</li>
        </ul>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>가격</h3>
        <ul>
          <li className={`${styles.filter} ${styles.active}`}>ALL</li>
          <li className={styles.filter}>0~10만원</li>
          <li className={styles.filter}>10만원~30만원</li>
          <li className={styles.filter}>30만원~50만원</li>
          <li className={styles.filter}>50만원이상</li>
          <div className={styles.price_wrapper}>
            직접입력
            <input
              type='number'
              name='min_price'
              id='min_price'
              placeholder='최소가격'
            />
            ~
            <input
              type='number'
              name='max_price'
              id='max_price'
              placeholder='최대가격'
            />
            <label htmlFor='min_price' className={styles.filter_inner_button}>
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
          <input type='text' name='region' id='region' placeholder='주소검색' />
          <label htmlFor='region' className={styles.filter_inner_button}>
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
          <li className={`${styles.filter} ${styles.active}`}>ALL</li>
          <li className={styles.filter}>1일</li>
          <li className={styles.filter}>3일</li>
          <li className={styles.filter}>일주일</li>
          <li className={styles.filter}>한달</li>
        </ul>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>사이트별</h3>
        <ul>
          <li className={`${styles.filter} ${styles.active}`}>ALL</li>
          <li className={styles.filter}>네이버</li>
          <li className={styles.filter}>당근</li>
          <li className={styles.filter}>번개장터</li>
          <li className={styles.filter}>세컨웨어</li>
          <li className={styles.filter}>중고나라</li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
