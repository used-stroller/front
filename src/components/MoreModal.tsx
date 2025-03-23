"use client";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, type CSSProperties } from "react";

const ContainerStyle = {
  position: "fixed",
  top: 10,
  right: 15,
  backgroundColor: "#fafafa", // 수정됨
  zIndex: 2000, // 수정됨
  width: "100px",
  height: "80px",
  borderRadius: "5px", // 수정됨
};

interface MoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const MoreModal: React.FC<MoreModalProps> = ({ isOpen, onClose, id }) => {
  const router = useRouter();
  const modalRef = useRef(null);
  // 항상 useEffect를 호출하게 하고, 조건문으로 효과를 제어합니다
  useEffect(() => {
    // 모달이 열렸을 때만 실행되도록 조건을 추가
    if (isOpen) {
      const handleOutsideClick = (e): void => {
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

  const goModifyPage = (id): void => {
    router.push("/product/modify/" + id);
  };

  const handleDelete = async (id: number): Promise<void> => {
    void deleteProduct(id);
  };

  async function deleteProduct(id: number): Promise<void> {
    if (confirm("정말 삭제하시겠습니까?")) {
      // 삭제 API 호출 (예: fetch 또는 axios 사용)
      await apiClient.post("/api/product/delete?id=" + id);
      window.location.href = "/";
    }
  }

  return (
    <div style={ContainerStyle as CSSProperties} ref={modalRef}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            textAlign: "left",
            fontSize: "16px",
          }}
          onClick={() => {
            typeof id === "string" && goModifyPage(id);
          }}
          onKeyDown={(e) => {
            (e.key === "Enter" || e.key === " ") &&
              typeof id === "string" &&
              goModifyPage(id);
          }}
        >
          수정하기
        </button>

        <button
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            cursor: "pointer",
            background: "none",
            border: "none",
            textAlign: "left",
            fontSize: "16px",
          }}
          onClick={() => {
            void (typeof id === "string" && handleDelete(id));
          }}
          onKeyDown={(e) => {
            void (
              (e.key === "Enter" || e.key === " ") &&
              typeof id === "string" &&
              handleDelete(id)
            );
          }}
        >
          삭제하기
        </button>

        {/* <p
          style={{ marginTop: "10px", marginLeft: "10px" }}
          onClick={() => typeof id === "number" && goModifyPage(id)}
        >
          수정하기
        </p>
        <p
          style={{ marginTop: "10px", marginLeft: "10px" 
          }}
          onClick={() => handleDelete(id)}
        >
          삭제하기
        </p> */}
      </div>
    </div>
  );
};

export default MoreModal;
