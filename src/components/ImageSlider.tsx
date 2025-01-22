"use client";

import React from "react";
import Slider, { type Settings } from "react-slick"; // react-slick의 Settings 타입 가져오기
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[]; // 이미지 경로 배열
  settings?: Settings; // react-slick 설정 옵션
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, settings }) => {
  const defaultSettings: Settings = {
    dots: true, // 하단 점 표시
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 개수
    ...settings, // 전달된 설정으로 기본 설정 덮어쓰기
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Slider {...defaultSettings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
