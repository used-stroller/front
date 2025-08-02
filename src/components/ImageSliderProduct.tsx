"use client";

import React from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
  settings?: Settings;
}

const ImageSliderProduct: React.FC<ImageSliderProps> = ({
  images,
  settings,
}) => {
  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    ...settings,
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", paddingBottom: "30px" }}>
      <Slider {...defaultSettings}>
        {images.map((src, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center", // 세로 가운데 정렬
                justifyContent: "center", // 가로 가운데 정렬
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <img
                src={process.env.NEXT_PUBLIC_BASE_URL + src}
                alt={`Slide ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // 비율 유지하며 잘리지 않게
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSliderProduct;
