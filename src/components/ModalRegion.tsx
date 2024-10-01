"use client";
import styles from "@/styles/page.module.css";
import Modal from "react-modal";
import { type ChangeEvent, type ReactElement, useState } from "react";
import { type HandleFilter, type Reset } from "@/types";

interface ModalRegionProps {
  isOpen: boolean;
  closeModal: () => void;
  handleFilter: HandleFilter;
  reset: Reset;
}

const ModalRegion = ({
  isOpen,
  closeModal,
  handleFilter,
  reset,
}: ModalRegionProps): ReactElement => {
  const resetRegion = (): void => {
    reset("region");
    setValue("");
    closeModal();
  };
  const [value, setValue] = useState("");
  const saveValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };
  function searchRegion(): void {
    handleFilter({
      target: {
        name: "region",
        value,
      },
    });
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      top: "0",
      left: "0",
    },
    content: {
      width: "80%",
      height: "135px",
      zIndex: "150",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#eee",
      justifyContent: "center",
      overflow: "auto",
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={styles.search_bar}>
        <input
          name="region"
          type="text"
          placeholder="검색할 지역을 입력하세요"
          onChange={saveValue}
        />
      </div>
      <button className={styles.popup_btn} onClick={resetRegion}>
        초기화
      </button>
      <button
        className={styles.popup_btn}
        onClick={() => {
          searchRegion();
          closeModal();
        }}
      >
        확인
      </button>
    </Modal>
  );
};

export default ModalRegion;
