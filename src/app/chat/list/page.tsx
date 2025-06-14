"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/chatList.module.css";
import apiClient from "@/utils/apiClient";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface ChatRoom {
  roomId: string;
  productImageUrl: string;
  opponentName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  productTitle: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ChatList() {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const handleClick = (id: string, productTitle: string): void => {
    console.log("이동할 방 ID:", id);
    router.push(`/chat/${id}?productTitle=${productTitle}`);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get("/api/chat/list");
        setChatRooms(data);
      } catch (error) {
        console.error("⚠️ 메시지 불러오기 실패:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className={styles.chatList}>
      {chatRooms.map((room) => (
        <div
          key={room.roomId}
          role="button"
          tabIndex={0}
          className={styles.chatItem}
          onClick={() => {
            handleClick(room.roomId, room.productTitle);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick(room.roomId);
            }
          }}
        >
          <img
            src={room.productImageUrl}
            alt="상품 이미지"
            className={styles.image}
          />
          <div className={styles.chatContent}>
            <div className={styles.topRow}>
              <span className={styles.nickname}>{room.opponentName}</span>
              <span className={styles.location}>
                {formatDistanceToNow(new Date(room.lastMessageTime), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
            <div className={styles.bottomRow}>
              <span className={styles.lastMessage}>{room.lastMessage}</span>
              {room.unreadCount > 0 && (
                <span className={styles.unread}>{room.unreadCount}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
