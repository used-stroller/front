import { signUpWithCredentials } from "@/serverActions/auth";

export function SignUp(): JSX.Element {
  return (
    <form action={signUpWithCredentials}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type={"submit"}>회원가입</button>
    </form>
  );
}
