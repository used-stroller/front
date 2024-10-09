"use client";

import { type ReactElement } from "react";
import styles from "@/styles/dropzone.module.css";
import React, { useState, useRef } from "react";

function MyDropzone(): ReactElement {
  const [images, setImages] = useState<Array<{ name: string; url: string }>>(
    [],
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
          },
        ]);
      }
    }
  }

  function uploadImages(): void {
    console.log("images: ", images);
  }
  function deleteImage(index): void{
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p>Drag & Drop</p>
      </div>
      <div className="drag-area">
        <span
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
          Browse
        </span>
        <input
          name="file"
          type="file"
          className="file"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        ></input>
      </div>
      <div className={styles.container}>
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
      <button type="button" onClick={uploadImages}>
        upload
      </button>
    </div>
  );
}
export default MyDropzone;