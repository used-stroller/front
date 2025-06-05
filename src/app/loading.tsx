"use client";
import React, { type ReactElement } from "react";

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
      <img src="/images/loading.svg" alt="loading" width={50} height={50} />
    </div>
  );
}
