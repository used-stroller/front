import React from 'react';
import styles from '@/styles/page.module.css';

<<<<<<< HEAD
const FormattedPrice = ({ value }): HTMLElement => {
  const formattedValue = value.toLocaleString("ko-KR");
=======
const FormattedPrice = ({ value }): JSX.Element => {
  const formattedValue = value.toLocaleString('ko-KR');
>>>>>>> 30c97b8a384481403c82831916638b02252131f6
  return <span className={styles.price}>{formattedValue}</span>;
};

export default FormattedPrice;
