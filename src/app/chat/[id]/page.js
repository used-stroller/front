"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "@/styles/chat.css";
import { useParams } from "next/navigation";
import { Send } from "lucide-react";

const socket = io("http://localhost:9092", {
  transport: ["websocket"],
  reconnection: false,
}); // 백엔드 서버 주소

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Chat() {
  const { id } = useParams();
  const userIdList = typeof id === "string" ? id.split("_").map(String) : [];
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [setIsConnected] = useState(socket.connected);
  const [sender] = useState("1");
  const [receiver] = useState("3");
  const roomId = id;
  const messageContainerRef = useRef(null); // 🔥 스크롤을 위한 Ref 추가

  // ✅ 메시지가 변경될 때마다 스크롤을 최하단으로 이동
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
        const response = await fetch(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `http://localhost:8080/api/chat/history/${roomId}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("response data:", data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMessages(data); // 상태 업데이트
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
        roomId: roomId,
        sender: sender, // 현재 사용자 ID
        receiver: receiver,
        message: message,
        // timestamp: new Date().toLocaleTimeString(),  // 현재 시간 추가
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === sender ? "my-message" : "other-message"}`}
          >
            <div className="message-bubble">
              <div
                className={` message-bubble message-text ${msg.sender === sender ? "my-bubble" : "other-bubble"}`}
              >
                {msg.message}
              </div>
              <div className="message-time">{msg.timestamp}</div>
            </div>
          </div>
        ))}
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
