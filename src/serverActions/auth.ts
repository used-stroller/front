"use server";

import axios from "axios";

export async function signUp(formData: FormData) {
  console.log("formData", formData.get("email"), formData.get("password"));
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await axios.post("http://localhost:8080/signup", {
      email,
      password,
    });

    if (response.status !== 200) {
      return null;
    }

    console.log(response.data, response.data.success);
    return response.data.success;
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
}
