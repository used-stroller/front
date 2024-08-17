"use client";

import { type ReactElement, type ReactNode } from "react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
  session?: Session | null;
}

/**
 * refetchOnWindowFocus: 이 설정은 tab 또는 window를 전환했다가, 다시 해당 페이지로 focus하면 session이 재발급!
 * refetchInterval client session update 이기능으로인해서 jwt refresh 서버측에서 session update안되는 현상을 해결한다.
 * - 즉 client 에서의 session update만 작동한다. server side에서는 버그가 존재 (auth.ts callback 호출)
 */
export default function AuthProvider({
  children,
  session,
}: Props): ReactElement {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus
      refetchInterval={10}
    >
      {children}
    </SessionProvider>
  );
}
