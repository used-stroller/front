'use client';

import { useState } from 'react';
import styles from "@/styles/rental.module.css";

const allStrollers = [
  {
    id: 1,
    brand: '부가부 폭스3',
    name: '부가부 폭스3',
    color: '미스트화이트',
    condition: '상',
    price: 250000,
    status: 'available',
    image: '/images/stroller1.png',
  },
  {
    id: 2,
    brand: '부가부 폭스3',
    name: '부가부 폭스3',
    color: '블랙',
    condition: '중',
    price: 240000,
    status: 'soldout',
    image: '/images/stroller2.png',
  },
  {
    id: 3,
    brand: '부가부 폭스3',
    name: '부가부 폭스3',
    color: null,
    condition: '중',
    price: 240000,
    status: 'soldout',
    image: '/images/stroller3.png',
  },
  {
    id: 4,
    brand: '스토케 엑스',
    name: '스토케 엑스',
    color: '라이트그레이',
    condition: '상',
    price: 270000,
    status: 'available',
    image: '/images/stroller4.png',
  },
  {
    id: 5,
    brand: '싸이벡스 프리암',
    name: '싸이벡스 프리암',
    color: '로즈골드',
    condition: '중',
    price: 260000,
    status: 'available',
    image: '/images/stroller5.png',
  },
];

const tabs = ['스토케 엑스', '부가부 폭스3', '싸이벡스 프리암'];

export default function RentalPage() {
  const [selectedTab, setSelectedTab] = useState('부가부 폭스3');

  const filteredStrollers = allStrollers.filter(
    (item) => item.brand === selectedTab
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>디럭스 유모차 대여</h1>
      <p className={styles.subtitle}>DELUXE STROLLER RENTAL</p>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              tab === selectedTab ? styles.active : ''
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.cardList}>
        {filteredStrollers.map((stroller) => (
          <div key={stroller.id} className={styles.card}>
            <img
              src={stroller.image}
              alt={stroller.name}
              className={styles.image}
            />
            <div className={styles.info}>
              <p className={styles.name}>{stroller.name}</p>
              {stroller.color && <p>색상: {stroller.color}</p>}
              <p>상태: {stroller.condition}</p>
              <p className={styles.price}>
                {stroller.price.toLocaleString()}원
              </p>
              <button
                className={
                  stroller.status === 'available'
                    ? styles.button
                    : styles.buttonDisabled
                }
                disabled={stroller.status !== 'available'}
              >
                {stroller.status === 'available' ? '대여 가능' : 'SOLD OUT'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
