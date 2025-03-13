"use client";

import { type ReactElement, useEffect, useState } from "react";
import styles from "@/styles/user.module.css";
import { useRouter } from "next/navigation";
import { type UserData } from "@/types";
import Image from "next/image";
import apiClient from "@/utils/apiClient";
import Loading from "@/app/loading";

export const Mypage = (): ReactElement => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await apiClient.get("user/mypage");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUserData(response.data.data);
        console.log("userdata", userData);
      } catch (err: any) {
        console.log("데이터 가져오기 실패");
      } finally {
        setLoading(false);
      }
    };
    void fetchUserData();
  }, []);

  const handleNavigation = (url: string): void => {
    router.push(url);
  };

  const goHome = (): void => {
    router.push("/");
  };

  // const validForm = (formData: FormData): boolean => {
  //   const nickname = formData.get("nickname");
  //   const address = formData.get("address");
  //   return nickname === myInfo?.nickname && address === myInfo.address;
  // };

  // const handleSubmit = async (
  //   event: React.FormEvent<HTMLFormElement>,
  // ): Promise<void> => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);

  //   if (validForm(formData)) {
  //     setResult("변경된 내용이 없습니다.");
  //     return;
  //   }

  //   setIsSubmit(true);

  //   try {
  //     const { message } = await updateMyInfo(formData);
  //     setResult(message);
  //   } catch (error) {
  //     console.error("Error during form submission:", error);
  //     setResult("현재 업데이트 할 수 없습니다. 관리자에게 문의하세요.");
  //   } finally {
  //     setIsSubmit(false);
  //   }
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.profile_nick_div}>
        <div>
          <Image
            src={userData?.image} // 실제 이미지 경로로 변경
            alt="Profile"
            width={80}
            height={80}
            className={styles.profile_img}
          />
        </div>
        <div className={styles.nickname}>{userData?.name}</div>
      </div>
      <div className={styles.gap}></div>

      <div className={styles.trade_div}>
        <h3 className={styles.trade_h3}>나의 거래</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Image
              src="../images/favorite.png" // 실제 이미지 경로로 변경
              alt="favorite"
              width={30}
              height={30}
              className={styles.item_img}
            />
            <span>관심목록(Coming soon)</span>
            <Image
              src="../images/arrow_right.png"
              alt="right_arrow"
              width={30}
              height={30}
              className={styles.arrow_right}
            />
          </li>
          <li className={styles.listItem}>
            <Image
              src="../images/receipt.png"
              alt="favorite"
              width={30}
              height={30}
              className={styles.item_img}
            />
            <span>판매내역(Coming soon)</span>
            <Image
              src="../images/arrow_right.png"
              alt="right_arrow"
              width={30}
              height={30}
              className={styles.arrow_right}
            />
          </li>
          <li className={styles.listItem}>
            <Image
              src="../images/local_mall.png" // 실제 이미지 경로로 변경
              alt="favorite"
              width={30}
              height={30}
              className={styles.item_img}
            />
            <span>구매내역(Coming soon)</span>
            <Image
              src="../images/arrow_right.png" // 실제 이미지 경로로 변경
              alt="right_arrow"
              width={30}
              height={30}
              className={styles.arrow_right}
            />
          </li>
        </ul>
      </div>

      <div className={styles.gap}></div>
      {/* 커뮤니티 섹션 */}
      <div className={styles.community_div}>
        <h3 className={styles.community_h3}>커뮤니티</h3>
        <ul className={styles.list}>
          <button
            className={styles.listItem}
            onClick={(): void => {
              handleNavigation("https://blog.naver.com/joyfool1007");
            }}
          >
            <Image
              src="../images/blog.svg"
              alt="네이버블로그"
              width={24}
              height={24}
              className={styles.community_img}
            />
            <span>네이버 블로그</span>
          </button>
          <button
            className={styles.listItem}
            onClick={(): void => {
              handleNavigation("https://band.us/band/97192384");
            }}
          >
            <Image
              src="../images/naverband.png"
              alt="네이버밴드"
              width={24}
              height={24}
              className={styles.community_img}
            />
            <span>중모차</span>
          </button>
          <button
            className={styles.listItem}
            onClick={() => {
              handleNavigation("https://open.kakao.com/o/sBPnvn2g");
            }}
          >
            <Image
              src="../images/openchat.png"
              alt="중모차 오픈채팅"
              width={24}
              height={24}
              className={styles.community_img}
            />
            <span>중모차 오픈채팅</span>
          </button>
        </ul>
      </div>
      <div className={styles.gap}></div>

      <div className={styles.home_div}>
        <button onClick={goHome} className={`${styles.button} ${styles.home}`}>
          홈으로
        </button>
      </div>
    </>
  );
};
