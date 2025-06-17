"use client";

import { useEffect, useState } from "react";
import { messaging } from "@/utils/firebase";
import { getToken } from "firebase/messaging";
import type { CSSProperties, ReactElement } from "react";

export default function FCMNotificationPrompt(): ReactElement {
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    // ✅ 서비스워커 등록
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => {
          console.log("✅ SW 등록 성공", reg);
        })
        .catch((err) => {
          console.error("❌ SW 등록 실패", err);
        });
    }
    // 3초 뒤 안내창 노출
    const timer = setTimeout(() => {
      if (Notification.permission === "default") {
        setShowPrompt(true);
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAllow = async (): Promise<void> => {
    setShowPrompt(false);
    if (hasRequested) return;
    setHasRequested(true);

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BJMGspJu3UgNNQx9L7KJZ82qpL9jIo1dCy7Y1bqINdKSWV2vRa1fPsaCDVXFT61VLpgVOWQL7V2xvh7c5jIYxw8", // ← 실제 공개 VAPID 키로 대체
        });
        console.log("✅ FCM Token:", token);

        // 서버로 전송
        await fetch("/api/save-fcm-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error("🔥 FCM 토큰 가져오기 실패", error);
      }
    } else {
      console.warn("🔕 사용자 알림 권한 거부");
    }
  };

  const handleClose = (): void => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div style={promptStyle}>
      <p>📢 알림을 허용하시면 채팅 알림을 받아보실 수 있어요</p>
      <div>
        <button onClick={handleAllow} style={btnStyle}>
          허용
        </button>
        <button onClick={handleClose} style={btnStyle}>
          나중에
        </button>
      </div>
    </div>
  );
}

// 스타일 간단 예시
const promptStyle: CSSProperties = {
  position: "fixed",
  bottom: "100px",
  right: "20px",
  padding: "16px",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  zIndex: 1000,
};

const btnStyle: CSSProperties = {
  margin: "0 8px",
  padding: "8px 12px",
  cursor: "pointer",
};
