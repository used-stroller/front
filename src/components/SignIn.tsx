import { signIn } from "@/auth";
import { AuthError } from "@auth/core/errors";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData)
          .then((res) => {
            if (res) {
              console.log("로그인 성공 리다이렉트");
              NextResponse.redirect("/");
            }
          })
          .catch((error) => {
            if (error instanceof AuthError) {
              return redirect("/login");
            }
            throw error;
          });
      }}
    >
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button>로그인</button>
    </form>
  );
}
