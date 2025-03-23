"use client";
import Image from "next/image";
import { getImageUrl } from "@/utils/productUtils";
import React, { type ReactElement } from "react";
import { type Content } from "@/types";

const ProductImage = ({ content }: { content: Content }): ReactElement => {
  const originalImage = getImageUrl(content.imgSrc);
  const [image, setImage] = React.useState(() => {
    // https로 시작하면 그대로, 아니면 jungmocha.co.kr 붙이기
    if (
      originalImage.startsWith("http://") ||
      originalImage.startsWith("https://")
    ) {
      return originalImage;
    }
    return `https://jungmocha.co.kr${originalImage.startsWith("/") ? "" : "/"}${originalImage}`;
  });
  console.log("content", content);

  const handleError = (): void => {
    setImage("/images/default_thumbnail.svg");
  };

  return (
    <Image
      src={image}
      alt={content.title}
      fill
      priority
      sizes={"(max-width: 600px) 220px, 220px"}
      onError={handleError}
    />
  );
};

export default ProductImage;
