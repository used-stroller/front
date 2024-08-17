import { signInWithCredentials } from "@/serverActions/auth";

export const SignIn = () => {
  return (
    <form action={signInWithCredentials}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button>로그인</button>
    </form>
  );
};
