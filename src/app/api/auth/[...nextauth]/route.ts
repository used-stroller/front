import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID?.replace(/=/g, "").trim(),
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // 세션 콜백: 세션에 사용자 정보를 추가
    async session({ session, token }) {
      if (token) {
        // 카카오 로그인 후 사용자 정보 추가
        session.user.id = token.id;
        session.user.kakaoId = token.kakaoId; // 카카오 ID 추가
        session.user.name = token.name; // 이름 추가
        session.user.email = token.email; // 이메일 추가
        session.user.profileImage = token.profileImage; // 프로필 이미지 추가
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // 카카오 로그인 시 추가적인 정보를 JWT에 저장
        token.kakaoId = profile.id; // 카카오 ID
        token.name = profile.properties.nickname; // 이름
        token.email = profile.kakao_account.email; // 이메일
        token.profileImage = profile.properties.profile_image; // 프로필 이미지
      }
      return token;
    },
  },
  debug: true,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
