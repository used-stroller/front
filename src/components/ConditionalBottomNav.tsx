"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const HIDDEN_PATHS = ["/product/"];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ConditionalBottomNav() {
  const pathname = usePathname();

  const shouldHide = HIDDEN_PATHS.some((path) => pathname.startsWith(path));

  if (shouldHide) return null;

  return <BottomNav />;
}
