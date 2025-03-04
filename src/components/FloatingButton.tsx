"use client";
import React from "react";

const FloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const moveToUpload = () => {
    const jwtToken = getCookie("jwt");
    if (jwtToken != null) {
      window.location.href = "/upload-product";
    } else {
      window.location.href = "/signin";
    }
  };

  // 토큰확인
  const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  return (
    <button
      onClick={moveToUpload}
      style={{
        position: "fixed",
        bottom: "50px",
        right: "20px",
        backgroundColor: "#665c8a",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "12px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
    >
      + 글쓰기
    </button>
  );
};

export default FloatingButton;
