"use client";

import { getMyInfo, updateMyInfo } from "@/serverActions/auth";
import { type ReactElement, useEffect, useState, useTransition } from "react";
import styles from "@/styles/user.module.css";
import { useRouter } from "next/navigation";
import { type MyUserType } from "@/types";

export const Mypage = (): ReactElement => {
  const [email, setEmail] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [address, setAddress] = useState<string>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [myInfo, setMyInfo] = useState<MyUserType | null>(null);

  const loadMyInfo = (): void => {
    startTransition(async () => {
      const dbMyInfo = await getMyInfo();
      setMyInfo(dbMyInfo);
      setEmail(dbMyInfo?.email);
      setNickname(dbMyInfo?.nickname);
      setAddress(dbMyInfo?.address);
    });
  };

  useEffect(() => {
    loadMyInfo();
  }, []);

  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setNickname(event.target.value);
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setAddress(event.target.value);
  };

  const goHome = (): void => {
    router.push("/");
  };

  const validForm = (formData: FormData): boolean => {
    const nickname = formData.get("nickname");
    const address = formData.get("address");
    return nickname === myInfo?.nickname && address === myInfo.address;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (validForm(formData)) {
      setResult("변경된 내용이 없습니다.");
      return;
    }

    setIsSubmit(true);

    try {
      const { message } = await updateMyInfo(formData);
      setResult(message);
    } catch (error) {
      console.error("Error during form submission:", error);
      setResult("현재 업데이트 할 수 없습니다. 관리자에게 문의하세요.");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
        className={styles.user_container}
      >
        <div className={styles.input_wrapper}>
          <label htmlFor="nickname">이메일</label>
          <input type="email" name="email" value={email} disabled={true} />
        </div>
        <div className={styles.input_wrapper}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="nickname"
            name="nickname"
            placeholder="Nickname"
            value={nickname}
            onChange={handleNicknameChange}
            disabled={isPending}
          />
        </div>
        <div>
          <label htmlFor="address">주소</label>
          <input
            type="address"
            name="address"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
            disabled={isPending}
          />
        </div>
        <button type={"submit"} className={styles.button}>
          {isSubmit ? "수정 중..." : "수정"}
        </button>
        {result !== null && <span>{result}</span>}
      </form>
      <button onClick={goHome} className={`${styles.button} ${styles.home}`}>
        홈으로
      </button>
    </>
  );
};
