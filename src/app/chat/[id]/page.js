"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "@/styles/chat.css";
import { useParams } from "next/navigation";
import { Send } from "lucide-react";
import apiClient from "@/utils/apiClient";
import { useSearchParams } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const socket = io("http://localhost:9092", {
  transports: ["websocket", "polling"],
  reconnection: false,
}); // 백엔드 서버 주소

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Chat() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");
  const { id } = useParams(); // URL에서 채팅방 ID 추출출
  const parts = typeof id === "string" ? id.split("_") : [];
  // const productId = parts[0] ?? null;
  const userIdList = parts.slice(1);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const roomId = id;
  const messageContainerRef = useRef(null); // 스크롤을 위한 Ref 추가
  const sender = String(accountId);
  console.log("sender",sender);
  const receiver = userIdList.find((id) => id !== sender);
  console.log("receiver",receiver);
  // 메시지가 변경될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    } else {
      console.log("⚠️ messageContainerRef가 null입니다!");
    }
  }, [messages]);

  useEffect(() => {
    console.log("채팅방 참여자", userIdList);

    socket.on("connect", () => {
      console.log("소켓 연결 성공:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("소켓 연결 끊어짐. 이유:", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 채팅방 입장 이벤트 전송
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return; // roomId가 없으면 실행하지 않음

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchData = async () => {
      try {
        const { data } = await apiClient.get(
          `${apiUrl}/api/chat/history/${roomId}`,
        );
        setMessages(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    void fetchData();

    // 실시간 메시지 수신
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]); // 새로운 메시지를 배열에 추가
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]); // roomId가 변경될 때마다 실행

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        roomId,
        senderId: sender, // ✅ 키 이름을 자바 필드에 맞게 수정
        receiverId: receiver,
        message,
      };
      socket.emit("sendMessage", msgData);
      setMessage(""); // 메시지 입력창 초기화
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>채팅방: {roomId}</h1>
      </div>

<div className="message-container" ref={messageContainerRef}>
  {messages.map((msg, index) => {
    const isMyMessage = String(msg.senderId) === sender;

    return (
      <div
        key={index}
        className={`message ${isMyMessage ? "my-message" : "other-message"}`}
      >
        <div className={`message-bubble ${isMyMessage ? "my-bubble" : "other-bubble"}`}>
          <div className="message-text">{msg.message}</div>
        </div>
        <div className="message-time">{msg.timestamp}</div>
      </div>
    );
  })}
</div>


      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="메시지를 입력하세요"
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
