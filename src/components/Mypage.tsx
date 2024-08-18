"use client";

import { getMyInfo, updateMyInfo } from "@/serverActions/auth";
import { useEffect, useState } from "react";
import styles from "@/styles/user.module.css";
import { useRouter } from "next/navigation";

export const Mypage = () => {
  const [nickname, setNickname] = useState<string>();
  const [address, setAddress] = useState<string>();
  const router = useRouter();
  useEffect(async () => {
    const dbMyInfo = await getMyInfo();
    console.log("dbMyInfo: ", dbMyInfo);
    setNickname(dbMyInfo?.nickname);
    setAddress(dbMyInfo?.address);
  }, []);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const goHome = (): void => {
    router.push("/");
  };

  return (
    <>
      <form action={updateMyInfo} className={styles.user_container}>
        <input
          type="nickname"
          name="nickname"
          placeholder="Nickname"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <input
          type="address"
          name="address"
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
        />
        <button type={"submit"} className={styles.button}>
          수정
        </button>
      </form>
      <button onClick={goHome} className={`${styles.button} ${styles.home}`}>
        홈으로
      </button>
    </>
  );
};
