"use server";
import { signIn, signOut } from "@/auth";

export const signInWithCredentials = async (fromData: FormData) => {
  await signIn("credentials", {});
};
export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};

export { auth as getSession, update as updateSession };
