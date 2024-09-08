"use server";

import axios from "axios";
import { auth, signIn, signOut } from "@/auth";
import type { MyUserType } from "@/types";
import { CallbackRouteError } from "@auth/core/errors";
import { type Session } from "next-auth";
import { z } from "zod";

const url = process.env.NEXT_PUBLIC_BASE_URL;

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
      `${url}/user/mypage/update`,
      {
        nickname,
        address,
      },
      {
        headers: { Authorization: session?.accessToken },
      },
    );
    if (response.data as boolean) {
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
    const response = await axios.get(`${url}/user/mypage`, {
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

export const signInWithCredentials = async (
  formData: FormData,
): Promise<{ error: string | null }> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const parsedCredentials = z
    .object({
      email: z.string().email("이메일 형식을 올바르게 입력하세요"),
      password: z
        .string()
        .min(8, "비밀번호는 8자리 이상 설정하세요")
        .regex(/[A-Za-z]/, "비밀번호는 반드시 영문 1자 이상 포함되어야 합니다")
        .regex(/[0-9]/, "비밀번호는 반드시 숫자가 1자 이상 포함되어야 합니다"),
    })
    .safeParse({ email, password });

  if (!parsedCredentials.success) {
    return {
      error: `회원가입 실패. ${parsedCredentials.error.issues.map((issue) => issue.message).join(", ")}`,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof CallbackRouteError) {
      console.error("로그인 에러!", error.cause?.err?.message);
      if (error.cause?.err?.message.includes("401") === true) {
        return { error: "로그인 실패. 아이디와 비밀번호를 확인 해 주세요." };
      }
      return { error: "서버 에러. 관리자에게 문의하세요." };
    }
  }
  return { error: null };
};

export const signOutWithForm = async (formData: FormData): Promise<void> => {
  await signOut({ redirect: true, redirectTo: "/" });
};

export const signUpWithCredentials = async (
  formData: FormData,
): Promise<{ error: string | null }> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const parsedCredentials = z
    .object({
      email: z.string().email("이메일 형식을 올바르게 입력하세요"),
      password: z
        .string()
        .min(8, "비밀번호는 8자리 이상 설정하세요")
        .regex(/[A-Za-z]/, "비밀번호는 반드시 영문 1자 이상 포함되어야 합니다")
        .regex(/[0-9]/, "비밀번호는 반드시 숫자가 1자 이상 포함되어야 합니다"),
    })
    .safeParse({ email, password });

  if (!parsedCredentials.success) {
    return {
      error: `회원가입 실패. ${parsedCredentials.error.issues.map((issue) => issue.message).join(", ")}`,
    };
  }

  try {
    const response = await axios.post(`${url}/user/signup`, {
      email,
      password,
    });
    console.log(response.data);
    if (response.status !== 200) {
      throw new Error("관리자에게 문의하세요.");
    }

    if (response.data.success as boolean) {
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
      error: `회원가입 실패. ${error as string}`,
    };
  }
};
