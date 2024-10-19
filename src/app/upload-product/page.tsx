"use client";
import styles from "@/styles/page.module.css";
import uploadCss from "@/styles/upload.module.css";
import Logo from "@/components/Logo";
import MyDropzone from "@/components/MyDropzone";
import { type ReactElement, useState, type ChangeEvent, useRef } from "react";
import Image from "next/image";

export default function Recommend(): ReactElement {
  const [selectedStatus, setSelectedStatus] = useState<string>("새상품");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1년이하");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedStatus(event.target.value);
  };
  const handlePeriodChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedPeriod(event.target.value);
  };
  const handleOptionChange = (value: string): void => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value],
    );
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // 입력 내용에 맞게 텍스트 박스의 높이 조절 
    if (textareaRef.current != null) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞춰 높이 조정 
    }
  }

  return (
    <div className={styles.contents}>
      <div className={styles.header_wrapper}>
        <Logo />
      </div>
      <div className={uploadCss.container}>
        <MyDropzone />
        <div className={uploadCss.product_detail_container}>
          <p className={uploadCss.title_p}>제목</p>
          <div className={uploadCss.title_div}>
            <input className={uploadCss.input_field}></input>
          </div>
          <div className={uploadCss.price}>
            <input
              className={uploadCss.input_field}
              placeholder="₩ 가격을 입력해 주세요"
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
                  value="1년이하" // value에 큰따옴표 추가
                  checked={selectedPeriod === "1년이하"}
                  onChange={handlePeriodChange}
                />
                1년이하
              </label>
              <label>
                <input
                  className={uploadCss.input_radio}
                  type="radio" // 라디오 버튼 타입
                  name="period"
                  value="2년이하" // value에 큰따옴표 추가
                  checked={selectedPeriod === "2년이하"}
                  onChange={handlePeriodChange}
                />
                2년이하
              </label>
              <label>
                <input
                  className={uploadCss.input_radio}
                  type="radio" // 라디오 버튼 타입
                  name="period"
                  value="3년이하" // value에 큰따옴표 추가
                  checked={selectedPeriod === "3년이하"}
                  onChange={handlePeriodChange}
                />
                3년이하
              </label>
              <label>
                <input
                  className={uploadCss.input_radio}
                  type="radio" // 라디오 버튼 타입
                  name="period"
                  value="3년이상" // value에 큰따옴표 추가
                  checked={selectedPeriod === "3년이상"}
                  onChange={handlePeriodChange}
                />
                3년이상
              </label>
            </div>
          </div>

          {/* ==============================option======================== */}
          <div className={uploadCss.option_container}>
            <p className={uploadCss.option_p}>구성품</p>
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
                    ? "/images/cupholder.png"
                    : "/images/bassinet.png"
                }
                className={uploadCss.image}
                onClick={() => {
                  handleOptionChange("cupholder");
                }}
                alt={"cupholder"}
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
                    ? "/images/bassinet.png"
                    : "/images/cupholder.png"
                }
                className={uploadCss.image}
                onClick={() => {
                  handleOptionChange("bassinet");
                }}
                alt={"cupholder"}
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
                    ? "/images/footmuff.png"
                    : "/images/cupholder.png"
                }
                className={uploadCss.image}
                onClick={() => {
                  handleOptionChange("footmuff");
                }}
                alt={"cupholder"}
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
                    ? "/images/moskito.png"
                    : "/images/cupholder.png"
                }
                className={uploadCss.image}
                onClick={() => {
                  handleOptionChange("moskito");
                }}
                alt={"cupholder"}
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
                    ? "/images/raincover.png"
                    : "/images/cupholder.png"
                }
                className={uploadCss.image}
                onClick={() => {
                  handleOptionChange("raincover");
                }}
                alt={"cupholder"}
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
                    ? "/images/windcover.png"
                    : "/images/cupholder.png"
                }
                className={uploadCss.image}
                onClick={() => {
                  handleOptionChange("windcover");
                }}
                alt={"cupholder"}
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
                "게시글 내용을 작성해 주세요. \n추가 옵션이 이나, 제품설명을 해주시면 좋아요!"
              }
            />
          </div>
          <div>
            <button className={uploadCss.complete_button}>작성완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}
