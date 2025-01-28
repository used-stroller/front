"use client";

import React, { useEffect, useState, type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import { usePathname } from "next/navigation";

export default function Footer(): ReactElement {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const hideFooterPages = ['/product'];
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (hideFooterPages.some(page => pathname.startsWith(page))) {
     setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [pathname]);

  return isShow ? (
    <div className={styles.footer}>
      <i className={styles.separator} />
      <div>
        <p className={styles.address}>
          {/* 제휴 및 기타 문의 */}
        </p>
        <p>Copyright © {year} 중모차</p>
      </div>
    </div>
  ) : <></>;
}
