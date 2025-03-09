import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import {
  type NextAuthOptions,
  type Session as NextAuthSession,
  type Profile,
} from "next-auth";

import { type JWT } from "next-auth/jwt";

// 카카오 프로필 타입 정의
interface KakaoProfile extends Profile {
  id: string;
  properties: {
    nickname: string;
    profile_image: string;
  };
  kakao_account: {
    email: string;
  };
}

// JWT 타입 정의
interface CustomJWT extends JWT {
  kakaoId: string;
  name: string;
  email: string;
  profileImage: string;
}

// 세션 타입 정의
interface CustomSession extends NextAuthSession {
  user: {
    id: string;
    kakaoId: string;
    name: string;
    email: string;
    profileImage: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 세션 만료시간 (60분)
    updateAge: 30 * 60, // 세션 갱신 추가 (30분)
  },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomJWT;
    }) {
      if (token && session.user) {
        // JWT에서 정보를 가져와 세션에 설정
        session.user.id = token.kakaoId;
        session.user.kakaoId = token.kakaoId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
    async jwt({
      token,
      profile,
    }: {
      token: JWT;
      profile?: KakaoProfile; // KakaoProfile 타입으로 지정
    }) {
      if (profile != null) {
        // 카카오 로그인 시 추가적인 정보를 JWT에 저장
        token.kakaoId = profile.id;
        token.name = profile.properties.nickname;
        token.email = profile.kakao_account.email;
        token.profileImage = profile.properties.profile_image;
      }
      return token as CustomJWT;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
