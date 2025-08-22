"use client";

import React, { useEffect, useState, type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import { usePathname } from "next/navigation";

export default function Footer(): ReactElement {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const hideFooterPages = ["/product"];
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (hideFooterPages.some((page) => pathname.startsWith(page))) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [pathname]);

  return isShow ? (
    <div className={styles.footer}>
      <i className={styles.separator} />
      <div>
        <p className={styles.address}>{/* 제휴 및 기타 문의 */}</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span>상호명: 중모차</span>
          <span>대표자: 이동훈</span>
          <span>사업자등록번호: 863-21-01666</span>
        </div>
        <div>
          <span>통신판매업신고번호: 2025-경기김포-6176 호</span>
        </div>
        <div>
          <span>주소: 경기도 김포시 김포한강 11로 276</span>
        </div>
        <div>
          {/* <span>전화: 010-8113-6030</span>
          <span>개인정보보호책임자: admin@jungmocha.co.kr</span> */}
        </div>
        <p>Copyright © {year} 중모차</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
