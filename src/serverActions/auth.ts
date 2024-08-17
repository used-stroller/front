"use server";

import axios from "axios";
import { auth, signIn, signOut } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import type { MyUserType } from "@/types";

export const updateMyInfo = async (formData: FormData): Promise<void> => {
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
    if (response.data.success) {
      redirect("/mypage");
    }
  } catch (error) {
    console.error("Error update mypage.", error);
    throw error;
  }
};

export const getMyInfo = async () => {
  const session = await auth();
  try {
    const response = await axios.get("http://localhost:8080/mypage", {
      headers: { Authorization: session?.accessToken },
    });
    console.log(response.data);
    if (response.data !== null) {
      return response.data as MyUserType;
    }
    // return null;
  } catch (error) {
    console.error("Error get mypage.", error);
    throw error;
  }
};

export const signInWithCredentials = async (
  formData: FormData,
): Promise<void> => {
  await signIn("credentials", {
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
    redirectTo: "/",
  });
};

export const signOutWithForm = async (formData: FormData): Promise<void> => {
  await signOut({ redirect: true, redirectTo: "/" });
};

export const signUpWithCredentials = async (
  formData: FormData,
): Promise<void> => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await axios.post("http://localhost:8080/signup", {
      email,
      password,
    });
    console.log(response.data);
    if (response.data.success) {
      redirect("/login", RedirectType.push);
    } else {
      redirect("/signup", RedirectType.push);
    }
  } catch (error) {
    console.error("Error signup.", error);
    throw error;
  }
};
