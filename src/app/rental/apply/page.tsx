"use client";
import React, { useState } from 'react';
import styles from "@/styles/rentalApply.module.css";

const RentalInquiryForm = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  return (
    <div className={styles.rentalFormContainer}>
      <h2 className={styles.title}>렌탈 문의하기</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>이름</label>
        <input type="text" id="name" name="name" placeholder="이름을 입력하세요" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>연락처</label>
        <input type="tel" id="phone" name="phone" placeholder="0101234-5678" className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>렌탈 희망 기간</label>
        <div className={styles.buttonGroup}>
          {['3개월', '6개월', '기타'].map((period) => (
            <button
              key={period}
              className={`${styles.button} ${selectedPeriod === period ? styles.active : ''}`}
              onClick={() => setSelectedPeriod(period)}
              type="button"
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="startDate" className={styles.label}>렌탈 희망 시작일</label>
        <div className={styles.inputWithIcon}>
          <input type="date" id="startDate" name="startDate" className={styles.input} />
          <span className={styles.calendarIcon}>📅</span>
        </div>
      </div>

      {/* <div className={styles.formGroup}>
        <label className={styles.label}>수령 방법</label>
        <div className={styles.buttonGroup}>
          {['직거래', '택배'].map((method) => (
            <button
              key={method}
              className={`${styles.button} ${selectedMethod === method ? styles.active : ''}`}
              onClick={() => setSelectedMethod(method)}
              type="button"
            >
              {method}
            </button>
          ))}
        </div>
      </div> */}

      <button className={styles.submitButton}>카카오톡으로 문의 전송하기</button>
    </div>
  );
};

export default RentalInquiryForm;

