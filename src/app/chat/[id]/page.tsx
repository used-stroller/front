"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "@/styles/chat.css";
import { useParams } from "next/navigation";
import { Send } from "lucide-react";
import apiClient from "@/utils/apiClient";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_API_URL;
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
console.log("🧪 socketUrl is:", socketUrl);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Chat() {
  const { id } = useParams();
  const roomId = id;

  const socketRef = useRef(null);
  const messageContainerRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");

  // ✅ 1. 소켓 연결 - 최초 1회
  useEffect(() => {
    socketRef.current = io("http://182.228.21.172:9092", {
      transports: ["polling", "websocket"],
      reconnection: false,
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ 소켓 연결 성공:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ 소켓 연결 해제:", reason);
    });

    // ✅ 연결 실패 로그 여기 추가!
    socket.on("connect_error", (err) => {
      console.error("❌ 연결 실패:", err.message || err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ✅ 2. 채팅방 입장
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    return () => {
      socket.off("receiveMessage"); // 중복 등록 방지
    };
  }, [roomId]);

  // ✅ 3. 메시지 불러오기 및 실시간 수신
  useEffect(() => {
    if (!roomId) return;

    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get(
          `${apiUrl}/api/chat/history/${roomId}`,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMessages(data.chatMessages);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setSender(data.currentUserId);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setReceiver(data.receiverId);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();

    const socket = socketRef.current;
    if (!socket) return;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [roomId]);

  // ✅ 4. 메시지 전송
  const sendMessage = (): void => {
    const socket = socketRef.current;
    if (!message.trim() || !socket) return;

    const msgData = {
      roomId,
      senderId: sender,
      receiverId: receiver,
      message,
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  // ✅ 5. 스크롤 하단 고정
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
              <div
                className={`message-bubble ${isMyMessage ? "my-bubble" : "other-bubble"}`}
              >
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
