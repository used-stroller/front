'use client'
import styles from '@/styles/page.module.css'
import Modal from 'react-modal';


  const ModalTown = ({isOpen,closeModal,handleFilter}): JSX.Element => {

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
            name='town'
            type='text'
            placeholder='검색할 지역을 입력하세요'
            onChange={handleFilter}
          />
      </div>
            <button onClick={closeModal}>확인</button>
            <button >초기화</button>
        </Modal>
    )
  }
  
  export default ModalTown