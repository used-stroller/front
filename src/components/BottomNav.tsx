"use client";

import styles from "@/styles/bottomNav.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { getCookie } from "@/utils/cookie";
import { FaRegUser } from "react-icons/fa";

const navItems = [
  { href: "/", label: "홈", icon: <HiHome size={24} /> },
  {
    href: "/upload-product", // 무조건 여기에 이동할 경로 명시
    label: "상품등록",
    icon: <IoMdAddCircle size={26} />,
    protected: true, // JWT 검증 필요
  },
  {
    href: "/chat/list",
    label: "채팅",
    icon: <IoChatbubbleEllipsesOutline size={24} />,
    protected: true, // JWT 검증 필요
  },
  { href: "/mypage", label: "나의 당근", icon: <FaRegUser size={22} /> },
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const handleClick = (e: React.MouseEvent) => {
          if (item.protected) {
            e.preventDefault();
            const jwtToken = getCookie("jwt");
            if (jwtToken) {
              window.location.href = item.href;
            } else {
              window.location.href = "/signin";
            }
          }
        };
        return (
          <Link
            key={item.href}
            href={item.href}
            className={styles.link}
            onClick={handleClick}
          >
            <div className={styles.item}>
              <div
                className={`${styles.icon} ${isActive ? styles.active : ""}`}
              >
                {item.icon}
              </div>
              <div
                className={`${styles.label} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
