import React, { type ReactElement } from "react";
import Image from "next/image";

export default function Loading(): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Image src="./images/loading.svg" alt="loading" width={50} height={50} />
    </div>
  );
}
