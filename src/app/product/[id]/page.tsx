"use client";

import ImageSlider from "@/components/ImageSlider";

export default function ProductDetail({ params }: number) {
  const { id } = params; // 동적 URL 파라미터 가져오기
  const productImages = [
    "/images/moskito_off.svg",
    "/images/raincover_off.svg",
    "/images/footmuff_off.svg",
  ];

  const sliderSettings = {
    arrows: true, // 이전/다음 화살표 표시
  };

  return (
    <div>
      <h1>Product ID: {id}</h1>
      <ImageSlider images={productImages} settings={sliderSettings} />
    </div>
  );
}
