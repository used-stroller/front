"use client";

import { useEffect, type ReactElement } from "react";
import styles from "@/styles/dropzone.module.css";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa"; // 카메라 아이콘 import
import { enableDragScroll } from "@/utils/enableDragScroll";
import { useUploadForm } from "@/utils/useUploadForm";

function MyDropzone(): ReactElement {
  const { images, setImages } = useUploadForm();
  const { deleted, setDeleted } = useUploadForm();
  // const [images, setImages] = useState<image[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
  function onFileSelect(event: React.ChangeEvent<HTMLInputElement>): void {
    const files = event.target.files;
    if (files == null || files.length === 0) return;
    const newImages = []; // 새로운 이미지 배열 생성
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        newImages.push({
          name: files[i].name,
          src: URL.createObjectURL(files[i]),
          file: files[i],
        });
      }
    }
    // 새로운 이미지가 있을 경우 setImages에 배열을 직접 전달
    if (newImages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setImages([...images, ...newImages]); // 배열을 직접 전달
    }
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
            <img src={images.src} alt={images.name}></img>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MyDropzone;
