// utils/cookie.ts
export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // SSR 대응

  const cookieList = document.cookie.split("; ");
  const cookie = cookieList.find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};
