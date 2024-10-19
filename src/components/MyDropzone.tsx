"use client";

import { useEffect, type ReactElement } from "react";
import styles from "@/styles/dropzone.module.css";
import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa"; // 카메라 아이콘 import
import { type image } from "@/types";
import axios from "axios";
import { enableDragScroll } from "@/utils/enableDragScroll";

function MyDropzone(): ReactElement {
  const [images, setImages] = useState<image[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (containerRef.current !== null) {
      // 드래그 스크롤 함수 적용
      enableDragScroll(containerRef.current);
    }
  }, []);
  function selectFiles(): void {
    fileInputRef.current?.click();
  }
  function onFileSelect(event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;
    if (files == null || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            file: files[i],
          },
        ]);
      }
    }
  }

  function deleteImage(index: number): void {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  async function uploadImages(): Promise<void> {
    console.log("upload_called");
    const formData = new FormData();
    // 선택된 이미지 파일을 FormData에 추가 
    images.forEach((image: image) => {
      formData.append("files", image.file); // 서버로 전송할 때 key이름은 서버에 맞게 설정 
    });

    // FormData 로그 출력
    for (const [key, value] of formData.entries()) {
      console.log(key, value); // key와 value 출력
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/product/image/upload",
        formData, // formData를 두 번째 인자로 직접 전달
        {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 업로드를 위해 Content-Type을 설정
          },
        },
      );
      if (response.status === 200) {
        console.log("Upload successful!");
        // 성공 처리
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  const handleUpload = () => {
    uploadImages().catch((error) => {
      console.error("Upload failed:", error);
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.select_zone}>
        <div
          className={styles.select}
          role="button"
          tabIndex={0} // Makes the span tabbable
          onClick={selectFiles} // Handles click event
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              // Allow activation with Enter or Space key
              e.preventDefault(); // Prevent default behavior (like scrolling for Space key)
              selectFiles(); // Execute the action
            }
          }}
        >
          <div className={styles.camera_container}>
            <FaCamera className={styles.camera_icon} />
          </div>
        </div>
        {/* <button onClick={handleUpload}>upload</button> */}
        <input
          name="file"
          type="file"
          className="file"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        ></input>
      </div>
      <div className={styles.container} ref={containerRef}>
        {images.map((images, index: number) => (
          <div className={styles.image} key={index}>
            <span
              className={styles.delete}
              role="button" // Indicates the span behaves like a button
              tabIndex={0} // Makes the span tabbable
              onClick={() => {
                deleteImage(index);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // Allow keyboard activation
                e.preventDefault();
                  deleteImage(index);
                }
              }}
              aria-label={`Delete ${images.name}`} // Adds an accessible label
            >
              &times;
            </span>
            <img src={images.url} alt={images.name}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyDropzone;
