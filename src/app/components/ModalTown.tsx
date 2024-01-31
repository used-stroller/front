'use client'
import styles from '@/styles/page.module.css'
import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image'


  const ModalTown = ({isOpen,closeModal}): JSX.Element => {

  const customStyles = {
    overlay: {
        backgroundColor: " rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
      },
      content: {
        width: "80%",
        height: "20%",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
      },
}
  return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <div className={styles.search_bar}>
          <input
            name='keyword'
            type='text'
            // value={(filter.keyword) ? filter.keyword : ''}
            placeholder='검색할 지역을 입력하세요'
          />
          <label htmlFor='keyword' className={styles.search_button}>
            <Image
              src='/images/search_button.svg'
              alt='search button'
              width={20}
              height={20}
            />
          </label>
      </div>
            <button onClick={closeModal}>확인</button>
        </Modal>
    )
  }
  
  export default ModalTown