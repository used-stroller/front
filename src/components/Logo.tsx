"use client";

import styles from "@/styles/page.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo(): JSX.Element {
  const router = useRouter();
  const [logo, setLogo] = useState<JSX.Element>();

  const changeLogo = (): void => {
    setLogo(
      window.matchMedia("(max-width: 600px)").matches ? (
        <Image
          src="./images/logo_simple.png"
          alt="중모차 로고"
          width={91}
          height={29}
          priority={true}
        />
      ) : (
        <Image
          src="./images/logo_block.png"
          alt="중모차 로고"
          width={142}
          height={54}
          priority={true}
        />
      ),
    );
  };

  useEffect(() => {
    changeLogo();
    window.addEventListener("resize", changeLogo);
    return () => {
      window.removeEventListener("resize", changeLogo);
    };
  }, []);

  return (
    <div
      className={styles.logo}
      onClick={() => {
        if (location.pathname === "/") {
          router.refresh();
        } else {
          router.push("/");
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          router.push("/");
        }
      }}
      role="button"
      tabIndex={0}
    >
      {logo}
    </div>
  );
}
