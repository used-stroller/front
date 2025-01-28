import React, { useState } from "react";

const MoreModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold">모달 창</h2>
        <p className="mt-4">이것은 모달의 내용입니다.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default MoreModal;