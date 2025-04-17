"use client";
import { useEffect } from "react";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function KakaoInitializer() {
  useEffect(() => {
    if (typeof window === "undefined") return; // 이 코드는 브라우저에서만 실행되도록 함

    // kakao SDK가 이미 로딩됬는지 확인
    if (window.Kakao?.isInitialized()) return;

    // Kakao 'SDK' 스크립트를 동적으로 생성
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js"; // Kakao JavaScript SDK URL
    script.async = true; // 비동기 로드 설정

    // 스크립트 로드 완료 후 실행되는 콜백
    script.onload = () => {
      // kakao 객체가 존재하고 아직 초기화되지 않았다면 초기화 실행
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_CLIENT_ID);
        console.log("Kakao SDK 초기화 완료");
      }
    };
    document.head.appendChild(script); // <head> 태그에 스크립트 실행
  }, []); // 최초 1회 실행
  return null; // 이 컴포넌트는 실제로 UI를 렌더링하지 않음
}
