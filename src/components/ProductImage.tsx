import Image from "next/image";
import { getImageUrl } from "@/utils/productUtils";
import React, { type ReactElement } from "react";
import { type Content } from "@/types";

const ProductImage = ({ content }: { content: Content }): ReactElement => {
  const [image, setImage] = React.useState(getImageUrl(content.imgSrc));

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
