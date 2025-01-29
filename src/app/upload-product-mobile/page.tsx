"use client";
import styles from "@/styles/page.module.css";
import uploadCss from "@/styles/uploadMobile.module.css";
import Logo from "@/components/Logo";
import { type ReactElement, useState, type ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useUploadForm } from "@/utils/useUploadForm";
import axios from "axios";
import MyDropzoneMobile from "@/components/MyDropzoneMobile";
import React from "react";

export default function Upload(): ReactElement {
  const {
    images,
    selectedStatus,
    selectedPeriod,
    selectedOptions,
    text,
    setSelectedStatus,
    setSelectedPeriod,
    setSelectedOptions,
    setText,
  } = useUploadForm();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handlePeriodChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedPeriod(event.target.value);
    console.log("selectedPeriod", selectedPeriod);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
    console.log("title", title);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPrice(event.target.value);
    console.log("price", price);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedStatus(event.target.value);
    console.log("selectedStatus", selectedStatus);
  };

  const handleOptionChange = (value: string): void => {
    setSelectedOptions((prev: string[]) => {
      // 이전 값이 배열인지 확인
      if (!Array.isArray(prev)) {
        return [value]; // 상태가 비정상일 경우 배열로 초기화
      }

      const newOptions = prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value];

      console.log("New options (after update):", newOptions); // 업데이트된 상태 확인
      return newOptions; // 항상 배열 반환
    });
  };

  const validCheck = (form: FormData): boolean => {
    // 1. 유효성 검사
    if (images.length === 0) {
      alert("이미지를 한 개 이상 선택해주세요.");
      return false; // 함수 종료
    }
    if (title.trim().length === 0) {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (price.trim().length === 0) {
      alert("가격을 입력해주세요.");
      return false;
    }
    if (selectedStatus.trim().length === 0) {
      alert("구매 상태를 선택해주세요.");
      return false;
    }
    if (selectedPeriod.trim().length === 0) {
      alert("사용 기간을 선택해주세요.");
      return false;
    }
    if (text.trim().length === 0) {
      alert("내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // 입력 내용에 맞게 텍스트 박스의 높이 조절
    if (textareaRef.current != null) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 높이 조정
    }
    console.log("text", text);
  };

  const submit = (event: React.FormEvent): void => {
    event.preventDefault(); // 폼 제출 시 새로고침 방지
    void handleSubmit();
  };

  async function handleSubmit(): Promise<void> {
    console.log("submit");

    const formData = new FormData();
    // 이미지 객체 타입 정의
    interface ImageType {
      file: File; // File은 브라우저의 파일 API에서 제공하는 타입
      // 필요한 다른 속성들도 추가 가능
    }

    // images 배열의 타입 지정
    const images: ImageType[] = [];

    // FormData에 추가
    images.forEach((image: ImageType) => {
      formData.append("imageList", image.file); // 파일 추가
    });

    formData.append("title", title);
    formData.append("price", price);
    formData.append("buyStatus", selectedStatus);
    formData.append("usePeriod", selectedPeriod);
    selectedOptions.forEach((option: string) => {
      formData.append("options", option);
    });
    formData.append("content", text);

    const isValid = validCheck(formData);
    if (!isValid) {
      return;
    }

    // FormData 로그 출력
    for (const [key, value] of formData.entries()) {
      console.log(key, value); // key와 value 출력
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/product/register",
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

  return (
    <form onSubmit={submit}>
      <div className={styles.contents}>
        <div className={styles.header_wrapper}>
          <Logo />
        </div>
        <div className={uploadCss.container}>
          <MyDropzoneMobile />
          <div className={uploadCss.product_detail_container}>
            <p className={uploadCss.title_p}>제목</p>
            <div className={uploadCss.title_div}>
              <input
                className={uploadCss.input_field}
                onInput={handleTitleChange}
              ></input>
            </div>
            <div className={uploadCss.price_div}>
              <span className={uploadCss.fixed_char}>₩</span>
              <input
                className={`${uploadCss.input_field} ${uploadCss.input_price}`}
                placeholder="가격을 입력해 주세요"
                onChange={handlePriceChange}
              ></input>
            </div>
            <div className={uploadCss.buy_status_div}>
              <p className={uploadCss.buy_status_p}>구입상태</p>
              <div className={uploadCss.buy_status}>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="buy_status"
                    value="새상품" // value에 큰따옴표 추가
                    checked={selectedStatus === "새상품"}
                    onChange={handleStatusChange}
                  />
                  새상품
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="buy_status"
                    value="중고" // value에 큰따옴표 추가
                    checked={selectedStatus === "중고"}
                    onChange={handleStatusChange}
                  />
                  중고
                </label>
              </div>
            </div>

            <div>
              <p className={uploadCss.use_period_p}>사용기간</p>
              <div className={uploadCss.use_period}>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value="1" // value에 큰따옴표 추가
                    checked={selectedPeriod === "1"}
                    onChange={handlePeriodChange}
                  />
                  1년이하
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value="2" // value에 큰따옴표 추가
                    checked={selectedPeriod === "2"}
                    onChange={handlePeriodChange}
                  />
                  2년이하
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value="3" // value에 큰따옴표 추가
                    checked={selectedPeriod === "3"}
                    onChange={handlePeriodChange}
                  />
                  3년이하
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value="4" // value에 큰따옴표 추가
                    checked={selectedPeriod === "4"}
                    onChange={handlePeriodChange}
                  />
                  3년이상
                </label>
              </div>
            </div>

            {/* ==============================option======================== */}
            <div className={uploadCss.option_container}>
              <p className={uploadCss.option_p}>구성품(선택하세요)</p>
              <div className={uploadCss.option_table}>
                <div className={uploadCss.option}>
                  <input
                    type="checkbox"
                    value="cupholder"
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange("cupholder");
                    }}
                    checked={selectedOptions.includes("cupholder")}
                  />
                  <Image
                    src={
                      selectedOptions.includes("cupholder")
                        ? "/images/cupholder_on.svg"
                        : "/images/cupholder_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange("cupholder");
                    }}
                    alt={"컵홀더"}
                    width={50}
                    height={50}
                  />
                  <p>컵홀더</p>
                </div>
                <div className={uploadCss.option}>
                  <input
                    type="checkbox"
                    value="bassinet"
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange("bassinet");
                    }}
                    checked={selectedOptions.includes("bassinet")}
                  />
                  <Image
                    src={
                      selectedOptions.includes("bassinet")
                        ? "/images/bassinet_on.svg"
                        : "/images/bassinet_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange("bassinet");
                    }}
                    alt={"베시넷"}
                    width={50}
                    height={50}
                  />
                  <p>베시넷</p>
                </div>
                <div className={uploadCss.option}>
                  <input
                    type="checkbox"
                    value="footmuff"
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange("footmuff");
                    }}
                    checked={selectedOptions.includes("footmuff")}
                  />
                  <Image
                    src={
                      selectedOptions.includes("footmuff")
                        ? "/images/footmuff_on.svg"
                        : "/images/footmuff_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange("footmuff");
                    }}
                    alt={"풋머프"}
                    width={50}
                    height={50}
                  />
                  <p>풋머프</p>
                </div>
                <div className={uploadCss.option}>
                  <input
                    type="checkbox"
                    value="moskito"
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange("moskito");
                    }}
                    checked={selectedOptions.includes("moskito")}
                  />
                  <Image
                    src={
                      selectedOptions.includes("moskito")
                        ? "/images/moskito_on.svg"
                        : "/images/moskito_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange("moskito");
                    }}
                    alt={"모기장"}
                    width={50}
                    height={50}
                  />
                  <p>모기장</p>
                </div>
                <div className={uploadCss.option}>
                  <input
                    type="checkbox"
                    value="raincover"
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange("raincover");
                    }}
                    checked={selectedOptions.includes("raincover")}
                  />
                  <Image
                    src={
                      selectedOptions.includes("raincover")
                        ? "/images/raincover_on.svg"
                        : "/images/raincover_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange("raincover");
                    }}
                    alt={"레인커버"}
                    width={50}
                    height={50}
                  />
                  <p>레인커버</p>
                </div>
                <div className={uploadCss.option}>
                  <input
                    type="checkbox"
                    value="windcover"
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange("windcover");
                    }}
                    checked={selectedOptions.includes("windcover")}
                  />
                  <Image
                    src={
                      selectedOptions.includes("windcover")
                        ? "/images/windcover_on.svg"
                        : "/images/windcover_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange("windcover");
                    }}
                    alt={"방풍커버"}
                    width={50}
                    height={50}
                  />
                  <p>방풍커버</p>
                </div>
              </div>
            </div>
            <div className={uploadCss.textarea_container}>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleInputChange}
                rows={1} // 기본 줄 크기
                className={uploadCss.textarea}
                placeholder={
                  "게시글 내용을 작성해 주세요. \n추가 옵션이나, 제품설명을 해주시면 좋아요!"
                }
              />
            </div>
            <div>
              <button type="submit" className={uploadCss.complete_button}>
                작성완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
