import { signUp } from "@/serverActions/auth";
import { NextResponse } from "next/server";

export function SignUp() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signUp(formData)
          .then((res: boolean) => {
            console.log("res: ", res);
            if (res) {
              NextResponse.redirect("/");
            }
          })
          .catch((err) => {
            console.error("회원가입에 실패했습니다.", err);
          });
      }}
    >
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type={"submit"}>회원가입</button>
    </form>
  );
}
