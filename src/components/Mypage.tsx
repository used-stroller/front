"use client";

import { getMyInfo, updateMyInfo } from "@/serverActions/auth";
import { useEffect, useState } from "react";

export const Mypage = () => {
  const [nickname, setNickname] = useState<string>();
  const [address, setAddress] = useState<string>();
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

  return (
    <form action={updateMyInfo}>
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
      <button type={"submit"}>수정</button>
    </form>
  );
};
