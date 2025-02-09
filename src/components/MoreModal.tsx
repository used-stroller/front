import apiClient from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";

const ContainerStyle = {
    position: "fixed",
    top: 10,
    right: 15,
    backgroundColor: "#fafafa",  // 수정됨
    zIndex: 2000,  // 수정됨
    width: "100px",
    height: "80px",
    borderRadius: "5px",  // 수정됨
  };

const MoreModal = ({ isOpen , onClose ,id}) => {
  const router = useRouter();
  const modalRef = useRef(null);
  // 항상 useEffect를 호출하게 하고, 조건문으로 효과를 제어합니다
  useEffect(() => {
     // 모달이 열렸을 때만 실행되도록 조건을 추가
    if (isOpen) {
      const handleOutsideClick = (e) => {
        // modalRef가 존재하고, 클릭된 위치가 모달 내부가 아니면
        if (modalRef.current && !modalRef.current.contains(e.target)) {
             // onClose를 호출하여 부모 컴포넌트로 모달을 닫도록 요청
          onClose(); // 부모 컴포넌트에서 전달된 onClose 호출
        }
      };

      // document에 클릭 이벤트 리스너를 추가
      document.addEventListener("click", handleOutsideClick);

     // Clean up: 컴포넌트가 언마운트되거나 isOpen이 변경될 때 이벤트 리스너를 제거
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  const goModifyPage = (id) => {
    router.push("/product/modify/"+ id);
  }

  const handleDelete = (id): void => {
    void deleteProduct(id);
  };

  async function deleteProduct(id: number): Promise<void> {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 삭제 API 호출 (예: fetch 또는 axios 사용)
      const response = await apiClient.post("product/delete?id=" + id);
    }
  };

  return (
    <div style={ContainerStyle} ref={modalRef}>
      <div style={{display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <p style={{marginTop:'10px',marginLeft: '10px'}} onClick={() => goModifyPage(id)}>수정하기</p>
        <p style={{marginTop:'10px',marginLeft: '10px'}} onClick={() => handleDelete(id)}>삭제하기</p>
      </div>
    </div>
  );
};

export default MoreModal;