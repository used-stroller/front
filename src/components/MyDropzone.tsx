"use client";

import { useEffect, useState, type ReactElement } from "react";
import styles from "@/styles/dropzone.module.css";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa"; // 카메라 아이콘 import
import { enableDragScroll } from "@/utils/enableDragScroll";
import { useUploadForm } from "@/utils/useUploadForm";
import imageCompression from "browser-image-compression";
import Loading from "@/app/loading";

function MyDropzone(): ReactElement {
  const { images, setImages } = useUploadForm();
  const { deleted, setDeleted } = useUploadForm();
  // const [images, setImages] = useState<image[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("imagesdropzone", images);

  useEffect(() => {
    if (containerRef.current !== null) {
      // 드래그 스크롤 함수 적용
      enableDragScroll(containerRef.current);
    }
  }, []);
  function selectFiles(): void {
    fileInputRef.current?.click();
  }
  async function onFileSelect(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const files = event.target.files;
    const MAX_IMAGES = 10; // ✅ 최대 이미지 수
    if (files == null || files.length === 0) return;
    setIsLoading(true); // ✅ 로딩 시작
    const newImages = []; // 새로운 이미지 배열 생성

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.split("/")[0] !== "image") continue;

      // ✅ 갯수 제한 체크
      const totalImageCount = images.length + newImages.length;
      if (totalImageCount >= MAX_IMAGES) {
        alert(`이미지는 최대 ${MAX_IMAGES}장까지 업로드할 수 있어요.`);
        break;
      }

      if (!images.some((e) => e.name === file.name)) {
        const compressedBlob = await imageCompression(file, {
          maxSizeMB: 1, // 최대 1M
          maxWidthOrHeight: 1000, // 최대 가로 세로
          useWebWorker: true,
        });

        // ✅ Blob → File로 변환하면서 원본 이름 유지
        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type,
        });

        newImages.push({
          name: files[i].name,
          src: URL.createObjectURL(files[i]),
          file: compressedFile,
        });
      }
    }
    // 새로운 이미지가 있을 경우 setImages에 배열을 직접 전달
    if (newImages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setImages([...images, ...newImages]); // 배열을 직접 전달
    }
    setIsLoading(false); // ✅ 로딩 끝
  }

  function deleteImage(index: number): void {
    const imageToDelete = images[index]; // 삭제할 이미지 객체 가져오기
    if (!imageToDelete) return; // 유효하지 않은 index 처리

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // 배열을 직접 할당
    if (imageToDelete.id !== null && imageToDelete.id !== undefined) {
      setDeleted((prev) => [...prev, imageToDelete.id]);
    }
    console.log("deleted", deleted);
  }

  if (isLoading) {
    return <Loading />;
  }

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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
            <img src={images.src} alt={images.name}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyDropzone;
