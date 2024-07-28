import { signIn } from "@/auth";
import { type ReactElement } from "react";

export function SignIn(): ReactElement {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>로그인</button>
    </form>
  );
}
