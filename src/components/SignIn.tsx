"use client";

import styles from "@/styles/user.module.css";
import { type ReactElement, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import Loading from "@/app/loading";

declare global {
  interface Window {
    Kakao: any;
  }
}

export const SignIn = (): ReactElement => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // 카카오 sdk 로드 및 초기화
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.kakao && window.Kakao.isInitialized()) return;

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("6902a4c27f23f4cc2ac78a342d499418");
        console.log("kakao sdk초기화 완료");
      }
    };
    document.head.appendChild(script);
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleKakaoSdkLogin = async () => {
    // if (!window.Kakao?.Auth) {
    //   console.warn("Kakao SDK 로드 실패");
    //   await handleNextAuthLogin(); // fallback
    //   return;
    // }

    window.Kakao.Auth.login({
      throughTalk: true,
      scope: "profile_nickname, profile_image",
      success: function (authObj: any) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res: any) {
            const kakaoId = res.id;
            const name = res.kakao_account.profile.nickname;
            const image = res.kakao_account.profile.profile_image_url;
            setIsLoading(true);
            console.log(" 보낼 데이터:", { kakaoId, name, image });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            callToServer(kakaoId, name, image); // ✅ 값 넘겨줌
          },
          fail: async function (error: any) {
            console.error("사용자 정보 요청 실패:", error);
            await handleNextAuthLogin(); // fallback
          },
        });
      },
      fail: async function (err: any) {
        console.warn("SDK 로그인 실패:", err);
        await handleNextAuthLogin(); // fallback
      },
    });
  };

  const handleNextAuthLogin = async (): Promise<void> => {
    console.log("로그인시도");
    try {
      setIsLoading(true); // 로딩 상태 활성화
      const res = await signIn("kakao", {
        prompt: "none",
        redirect: false,
      });
      if (!res.ok) {
        await signIn("kakao", { redirect: false });
      }
    } catch (error) {
      console.log("자동 로그인 실패, 수동 로그인 필요");
    }
  };

  const goHome = (): void => {
    router.push("/");
  };

  function callToServer(kakaoId: string, name: string, image: string): void {
    console.log("📡 callToServer 실행됨");
    console.log("백엔드 URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
    console.log("전송할 유저 정보:", { kakaoId, name, image });
    axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/backend/auth/kakao",
        {
          loginResult: {
            user: {
              kakaoId,
              name,
              image,
            },
            expires: "",
          },
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log("✅ 백엔드 응답:", response.data);
        window.location.href = callbackUrl;
      })
      .catch((error) => {
        console.error("❌ 백엔드 요청 실패:", error);
        alert("서버와의 통신 중 문제가 발생했습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.blank}></div>
      <div className={styles.imageContainer}>
        <Image
          src="/images/kakao_login_medium_wide.png"
          alt="카카오로그인"
          fill
          className={styles.kakao_image}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            void handleKakaoSdkLogin();
          }} // void 키워드로 Promise 반환 무시
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          maxWidth: "500px",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
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
