import React from 'react';
import styles from '@/styles/page.module.css';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <i className={styles.separator} />
      <div className={styles.footer_wrapper}>
        <p className={styles.address}>
          제휴 및 기타 문의
          <a href='mailto:hoonyhoeny@gmail.com'>hoonyhoeny@gmail.com</a>
        </p>
        <p>Copyright © {year} 중모차</p>
      </div>
    </div>
  );
}
