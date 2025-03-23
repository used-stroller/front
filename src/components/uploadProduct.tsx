"use client";
import styles from "@/styles/page.module.css";
import uploadCss from "@/styles/upload.module.css";
import Logo from "@/components/Logo";
import MyDropzone from "@/components/MyDropzone";
import { type ReactElement, useState, type ChangeEvent, useRef } from "react";
import Image from "next/image";
import { useUploadForm } from "@/utils/useUploadForm";
import apiClient from "@/utils/apiClient";
import Loading from "@/app/loading";

export default function Upload(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
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
    setSelectedPeriod(Number(event.target.value)); // 숫자로 변환
    console.log("selectedPeriod", event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPrice(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedStatus(event.target.value);
  };

  const handleOptionChange = (value: number): void => {
    setSelectedOptions((prev: number[]) => {
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

  const submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // ✅ 여기서 정확하게 이벤트 참조
    console.log("📤 SUBMIT TRIGGERED"); // 확인용
    void handleSubmit();
  };
  async function handleSubmit(): Promise<void> {
    if (images.length === 0) {
      alert("이미지를 선택해 주세요");
      return;
    }
    if (!title) {
      alert("제목을 입력해 주세요");
      return;
    }
    if (!price) {
      alert("가격을 입력해 주세요");
      return;
    }
    if (!text) {
      alert("내용을 입력해 주세요");
      return;
    }

    console.log("submit");
    const formData = new FormData();
    images.forEach((image) => {
      console.log("file", image.file);
      formData.append("imageList", image.file);
    });

    formData.append("title", title);
    formData.append("price", price);
    formData.append("buyStatus", selectedStatus);
    formData.append("usePeriod", selectedPeriod);
    selectedOptions.forEach((option: number) => {
      formData.append("options", option);
    });
    formData.append("content", text);

    // FormData 로그 출력
    for (const [key, value] of formData.entries()) {
      console.log(key, value); // key와 value 출력
    }

    try {
      setIsLoading(true);
      const response = await apiClient.post("/api/product/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log("register successful!");
        console.log(response.data);
        window.location.href = "/product/" + String(response.data);
        // 성공 처리
      } else {
        alert(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error Register files:", error);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={submit}>
      <div className={styles.contents}>
        <div className={styles.header_wrapper}>
          <Logo />
        </div>
        <div className={uploadCss.container}>
          <MyDropzone />
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
                    value={1} // value에 큰따옴표 추가
                    checked={selectedPeriod === 1}
                    onChange={handlePeriodChange}
                  />
                  1년이하
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value={2} // value에 큰따옴표 추가
                    checked={selectedPeriod === 2}
                    onChange={handlePeriodChange}
                  />
                  2년이하
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value={3} // value에 큰따옴표 추가
                    checked={selectedPeriod === 3}
                    onChange={handlePeriodChange}
                  />
                  3년이하
                </label>
                <label>
                  <input
                    className={uploadCss.input_radio}
                    type="radio" // 라디오 버튼 타입
                    name="period"
                    value={4} // value에 큰따옴표 추가
                    checked={selectedPeriod === 4}
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
                    value={1}
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange(1);
                    }}
                    checked={selectedOptions.includes(1)}
                  />
                  <Image
                    src={
                      selectedOptions.includes(1)
                        ? "/images/cupholder_on.svg"
                        : "/images/cupholder_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange(1);
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
                    value={2}
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange(2);
                    }}
                    checked={selectedOptions.includes(2)}
                  />
                  <Image
                    src={
                      selectedOptions.includes(2)
                        ? "/images/bassinet_on.svg"
                        : "/images/bassinet_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange(2);
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
                    value={3}
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange(3);
                    }}
                    checked={selectedOptions.includes(3)}
                  />
                  <Image
                    src={
                      selectedOptions.includes(3)
                        ? "/images/footmuff_on.svg"
                        : "/images/footmuff_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange(3);
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
                    value={4}
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange(4);
                    }}
                    checked={selectedOptions.includes(4)}
                  />
                  <Image
                    src={
                      selectedOptions.includes(4)
                        ? "/images/moskito_on.svg"
                        : "/images/moskito_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange(4);
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
                    value={5}
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange(5);
                    }}
                    checked={selectedOptions.includes(5)}
                  />
                  <Image
                    src={
                      selectedOptions.includes(5)
                        ? "/images/raincover_on.svg"
                        : "/images/raincover_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange(5);
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
                    value={6}
                    className={uploadCss.checkbox}
                    onChange={() => {
                      handleOptionChange(6);
                    }}
                    checked={selectedOptions.includes(6)}
                  />
                  <Image
                    src={
                      selectedOptions.includes(6)
                        ? "/images/windcover_on.svg"
                        : "/images/windcover_off.svg"
                    }
                    className={uploadCss.image}
                    onClick={() => {
                      handleOptionChange(6);
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
                  "게시글 내용을 작성해 주세요. \n추가 옵션이 이나, 제품설명을 해주시면 좋아요!"
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
