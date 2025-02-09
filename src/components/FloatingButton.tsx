'use client';
import React from "react";

const FloatingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {

    const moveToUpload = () => {
        window.location.href = "/upload-product";
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

