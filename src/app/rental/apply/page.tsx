"use client";
import React, { useState } from 'react';
import styles from "@/styles/rentalApply.module.css";
import { useSearchParams } from 'next/navigation';
import apiClient from '@/utils/apiClient';

const RentalInquiryForm = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState(''); 

const searchParams = useSearchParams();
const id = searchParams.get('id'); // "7"

    const submit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    void submitApply();
    };

  async function submitApply(): Promise<void> {
    try {
      const response = await apiClient.post(
        "/api/rental/apply",
        {
          rentalId: id,
          name: name,
          phone: phone,
          selectedPeriod: selectedPeriod,
          startDate: startDate,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    if(response.status === 200) {
      alert("문의가 접수되었습니다!");
      window.location.href = "/rental/"+id;
    }

    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("실패했습니다.");
    }
  }

  return (
    <div className={styles.rentalFormContainer}>
      <h2 className={styles.title}>렌탈 문의하기</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>이름</label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder="이름을 입력하세요"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>연락처</label>
        <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="01012345678"
        className={styles.input}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
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
            <input
            type="date"
            id="startDate"
            name="startDate"
            className={styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />
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

      <button className={styles.submitButton} onClick={submit}>
        카카오톡으로 문의 전송하기
      </button>
    </div>
  );
};

export default RentalInquiryForm;
