import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          const user = null;

          // const { email, password } = await signInSchema.parseAsync({
          //   email: credentials.email,
          //   password: credentials.password,
          // });

          const response = await axios.post("http://localhost:8080/login", {
            email,
            password,
          });

          if (response.status === 200) {
            console.log("success: ", response.status);
            console.log("success: ", response.headers.getAuthorization());
            console.log("success: ", response.headers["set-cookie"]);
          }

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.");
          }

          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          console.error("authrize 에러!", error.response.data);
        }
      },
    }),
  ],
});
