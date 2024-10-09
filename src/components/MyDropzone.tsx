"use client";

import { type ReactElement } from "react";
import styles from "@/styles/dropzone.module.css";
import React, { useState, useRef } from "react";

function MyDropzone(): ReactElement {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  function selectFiles(): void{
    fileInputRef.current.click();
  }
  function onFileSelect(event): void {
    const files = event.target.files;
    if(files.length == 0) return;
    for(let i = 0; i< files.length; i++){
      if (files[i].type.split("/")[0] !== "image") continue;
      if(!images.some((e)=> e.name == file[i].name)) {
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
  function deleteImage(index): void{
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }
  function onDragOver(event): void {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event): void {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event): void {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
  }

  function uploadImages(): void {
    console.log("images: ", images);
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p>Drag & Drop</p>
      </div>
      <div
        className="drag-area"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className={styles.select}>Drop images here</span>
        ) : (
          <>
            Drag & Drop image here or{" "}
            <span className={styles.select} role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}
        <span className={styles.select}>Drop images here</span>
        Drag & Drop image here or{" "}
        <span className={styles.select} role="button" onClick={selectFiles}>
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
        {images.map((images,index) => (
          <div className={styles.image} key={index}>
            <span className={styles.delete} onClick={()=> deleteImage(index)}>&times;</span>
            <img src={images.url} alt={images.name}></img>
          </div>
        ))}
      </div>
      <button type="button" onClick={uploadImages}>upload</button>
    </div>
  );
}
export default MyDropzone;