"use client";

import styles from "@/styles/bottomNav.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { FaRegClipboard, FaRegUser } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

const navItems = [
  { href: "/", label: "홈", icon: <HiHome size={24} /> },
  { href: "/life", label: "동네생활", icon: <FaRegClipboard size={22} /> },
  { href: "/map", label: "동네지도", icon: <MdLocationOn size={24} /> },
  {
    href: "/chat",
    label: "채팅",
    icon: <IoChatbubbleEllipsesOutline size={24} />,
  },
  { href: "/mypage", label: "나의 당근", icon: <FaRegUser size={22} /> },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={styles.link}>
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
