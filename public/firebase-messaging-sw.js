// importScripts는 Service Worker 전용 방식입니다.
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
);

// Firebase 설정 (firebaseConfig와 동일)
firebase.initializeApp({
  apiKey: "AIzaSyXXX...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg123456",
});

// messaging 인스턴스 가져오기
const messaging = firebase.messaging();

// 푸시 메시지 수신 처리
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png", // 원하는 아이콘 경로
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
