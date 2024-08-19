"use server";

import axios from "axios";
import { auth, signIn, signOut } from "@/auth";
import type { MyUserType } from "@/types";
import { CallbackRouteError } from "@auth/core/errors";
import { type Session } from "next-auth";

export const getSession = async (): Promise<Session | null> => {
  return await auth();
};

export const updateMyInfo = async (
  formData: FormData,
): Promise<{ message: string }> => {
  const session = await auth();
  const nickname = formData.get("nickname");
  const address = formData.get("address");
  try {
    const response = await axios.post(
      "http://localhost:8080/mypage/update",
      {
        nickname,
        address,
      },
      {
        headers: { Authorization: session?.accessToken },
      },
    );
    console.log(response.data);
    if (response.data) {
      return { message: "업데이트 완료" };
    }
    return { message: "업데이트 실패" };
  } catch (error) {
    console.error("Error update mypage.", error);
    return { message: "업데이트 실패" };
  }
};

export const getMyInfo = async (): Promise<MyUserType | null> => {
  const session = await auth();
  try {
    const response = await axios.get("http://localhost:8080/mypage", {
      headers: { Authorization: session?.accessToken },
    });
    console.log(response.data);
    if (response.data !== null) {
      return response.data as MyUserType;
    }
    return null;
  } catch (error) {
    console.error("Error get mypage.", error);
    throw error;
  }
};

export const signInWithCredentials = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof CallbackRouteError) {
      console.error("로그인 에러!", error.cause?.err?.message);
      if (error.cause?.err?.message === "UNAUTHORIZED") {
        return { error: "로그인 실패. 아이디와 비밀번호를 확인 해 주세요." };
      }
    }
  }
  return { error: null };
  // .then((e) => {
  //   console.log("로그인 성공");
  //   return {
  //     error: null,
  //   };
  // })
  // .catch((e) => {
  //   if (e instanceof Error) {
  //     if (e.message === "NEXT_REDIRECT") {
  //       return {
  //         error: null,
  //       };
  //     }
  //   }
  //   console.error("로그인 실패: ", email, e);
  //   return {
  //     error: "로그인 실패. 아이디와 비밀번호를 확인 해 주세요.",
  //   };
  // });
};

export const signOutWithForm = async (formData: FormData): Promise<void> => {
  await signOut({ redirect: true, redirectTo: "/" });
};

export const signUpWithCredentials = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await axios.post("http://localhost:8080/signup", {
      email,
      password,
    });
    console.log(response.data);
    if (response.status !== 200) {
      throw new Error("관리자에게 문의하세요.");
    }

    if (response.data.success) {
      console.log("회원가입 성공");
      return { error: null };
    } else {
      console.error("회원가입 실패: ", email);
      return {
        error: `회원가입 실패. ${response.data.message}`,
      };
    }
  } catch (error) {
    console.error("Error signup.", error);
    return {
      error: `회원가입 실패. ${error}`,
    };
  }
};
