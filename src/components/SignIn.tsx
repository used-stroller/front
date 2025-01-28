"use client";

import styles from "@/styles/user.module.css";
import { type ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import Loading from "@/app/loading";

export const SignIn = (): ReactElement => {
  const router = useRouter();
  const { data: session } = useSession();
  const [shouldSendToBackend, setShouldSendToBackend] = useState(false); // 백엔드 호출 조건
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가


  const handleLogin = async () => {
    try {
      setIsLoading(true); // 로딩 상태 활성화
      const result = await signIn("kakao", { redirect: false });
    } catch (error) {
      alert('로그인 중 문제가 발생했습니다.');
    }
  };

    // 세션이 업데이트된 후 shouldSendToBackend 설정
  useEffect(() => {
    if (session?.user) {
      // 세션이 인증 상태로 변경되면 실행
      setShouldSendToBackend(true);
    }
  }, [session]); // status가 변경될 때마다 실행

  // 상태 변경을 감지하여 callToServer 호출
  useEffect(() => {
    if (shouldSendToBackend) {
      callToServer();
    }
  }, [shouldSendToBackend]);

  const goHome = (): void => {
    router.push("/");
  };

  function callToServer() {
    console.log(shouldSendToBackend)
    if (!shouldSendToBackend) return; // 조건에 따라 실행
    console.log("실행됨")
    axios
      .post(
        "http://localhost:8080/user/api/auth/kakao",
        {
          loginResult: session,
      }, {
          withCredentials: true, // 쿠키를 요청에 포함시킴
      })
      .then((response) => {
        console.log("백엔드 응답:", response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("백엔드 요청 실패:", error);
        alert("서버와의 통신 중 문제가 발생했습니다.");
      })
      .finally(() => {
        setShouldSendToBackend(false); // 요청 완료 후 상태 초기화
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.blank} ></div>
      <div className={styles.imageContainer}>
        <Image
          src="/images/kakao_login_medium_wide.png"
          alt="카카오로그인"
          fill
          className={styles.kakao_image}
          onClick={handleLogin}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
        <span style={{ margin: "0 10px", whiteSpace: "nowrap" }}>또는</span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />
      </div>

      <div className={`${styles.toHome_div}`}>
        <button onClick={goHome} className={`${styles.button} ${styles.home}`}>
          홈으로
        </button>
        {/* <button
          onClick={goSignup}
          className={`${styles.button} ${styles.signup}`}
        >
          회원가입
        </button> */}
      </div>
    </>
  );
};
