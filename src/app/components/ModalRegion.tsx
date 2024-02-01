'use client'
import styles from '@/styles/page.module.css'
import Modal from 'react-modal';
import { useFilter } from '../context/FilterContext';


  const ModalRegion = ({isOpen,closeModal,handleFilter ,reset}): JSX.Element => {
  const resetRegion = () => {
    reset('region')
  }
  const { filter} = useFilter()

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
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}  ariaHideApp={false}>
          <div className={styles.search_bar}>
          <input
            name='region'
            type='text'
            placeholder='검색할 지역을 입력하세요'
            onChange={handleFilter}
            value={filter.region}
          />
      </div>
            <button onClick={closeModal}>확인</button>
            <button onClick={resetRegion}>초기화</button>
        </Modal>
    )
  }
  
  export default ModalRegion