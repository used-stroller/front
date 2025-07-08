"use client";

export default function KakaoFloatingButton() {
  return (
    <a
      href="https://pf.kakao.com/_Pcxkrn/chat"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        zIndex: 9999,
      }}
    >
      <img
        src="/images/ch_kakao.jpeg" // ← public/icons 폴더에 이미지 넣기
        alt="카카오톡 채널 채팅하기"
        width={50}
        height={50}
        style={{
          display: "block",
          borderRadius: "16px",
        }}
      />
    </a>
  );
}
