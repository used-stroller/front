import React, { type ReactElement } from "react";
import Image from "next/image";

export default function Loading(): ReactElement {
  return (
    <Image src="/images/loading.svg" alt="loading" width={50} height={50} />
  );
}
