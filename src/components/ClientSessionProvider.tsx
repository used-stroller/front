"use client"; // 클라이언트 컴포넌트로 지정

import { SessionProvider } from "next-auth/react";

const ClientSessionProvider = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientSessionProvider;
