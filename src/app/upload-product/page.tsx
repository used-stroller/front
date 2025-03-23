// ✅ app/upload-product/page.tsx (Server Component)
import Upload from "@/components/uploadProduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/explicit-function-return-type
export default async function UploadPage() {
  const jwt = (await cookies()).get("jwt")?.value;
  const currentPath = "/upload-product";

  if (!jwt) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(currentPath)}`);
  }

  return <Upload />;
}
