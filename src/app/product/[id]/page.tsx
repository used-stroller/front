"use client";

import styles from "@/styles/productDetail.module.css";
import ImageSlider from "@/components/ImageSlider";
import { use, useEffect, useState } from "react";
import apiClient from "@/utils/apiClient";
import Image from "next/image";
import FormattedPrice from "@/components/FormattedPrice";
import { useRouter } from "next/navigation";
import MoreModal from "@/components/MoreModal";
import uploadCss from "@/styles/upload.module.css";
import { type userData } from "@/types";

// params의 타입을 정의
interface Params {
  id: string; // URL 파라미터로 id를 받는다고 가정
}

interface ProductData {
  id: number;
  title: string;
  content: string;
  price: number;
  buyStatus: string;
  usePeriod: number;
  myPageDto: userData;
  seller: userData;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  sellerId: number;
}

interface ImageData {
  src: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ProductDetail({ params }: { params: Promise<Params> }) {
  const [selectedValue, setSelectedValue] = useState<string>("거래완료");
  const [userData, setUserData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [buyStatus, setBuyStatus] = useState<string>("");
  const [usePeriod, setUsePeriod] = useState<number>(0);
  const [sellerId, setSellerId] = useState<number>(0);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productImages, setProductImages] = useState<string[]>([
    process.env.NEXT_PUBLIC_BACKEND_URL + "/images/default_thumbnail.svg",
  ]);
  const [favorite, setFavorite] = useState(false);
  const { id } = use(params);
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id") || params?.id; // 동적 URL 파라미터 가져오기

  const sliderSettings = {
    arrows: true, // 이전/다음 화살표 표시
  };

  const handleGoBack = (): void => {
    router.back();
  };
  const handleGoHome = (): void => {
    router.push("/");
  };

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      console.log(document.cookie);
      try {
        const response = await apiClient.get("/api/product/get/" + id);
        const imageList: ImageData[] = response.data.imageList;
        const imageArray = imageList.map((image) => image.src);
        const selectedOptions = response.data.options;
        console.log(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setProductData(response.data);
        setProductImages(imageArray);
        setSelectedOptions([...selectedOptions]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setBuyStatus(response.data.buyStatus); // ✅ productData가 아니라 response.data 사용
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUsePeriod(response.data.usePeriod);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUserData(response.data.myPageDto);
        setSellerData(response.data.seller);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFavorite(response.data.favorite); // ✅ productData.favorite이 아니라 response.data.favorite 사용
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setSellerId(response.data.sellerId);
      } catch (err: any) {
        console.log("데이터 가져오기 실패");
      }
    };
    void fetchProductData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedValue(event.target.value);
  };

  function formatDate(date: string): string {
    return date?.substring(0, 10).replaceAll(/^20/g, "").replaceAll("-", ".");
  }

  // 모달 닫기 핸들러
  const handleCloseModal = (): void => {
    setIsModalOpen(false); // 모달 닫기
  };

  const periodLabels: Record<number, string> = {
    1: " #1년이하 사용",
    2: " #2년이하 사용",
    3: " #3년이하 사용",
    4: " #3년이상 사용",
  };

  const buyStatusLabels: Record<string, string> = {
    새상품: "#신품구매",
    중고: "#중고구매",
  };

  const changeFavorite = (): void => {
    console.log("changeFavorite시행됨");
    setFavorite(!favorite);

    if (!favorite) {
      void apiClient.post(
        "/api/product/favorite/add",
        { productId: Number(id) }, // JSON 형식으로 전송
        { headers: { "Content-Type": "application/json" } }, // JSON 명시
      );
    } else {
      void apiClient.post(
        "/api/product/favorite/delete",
        { productId: Number(id) }, // JSON 형식으로 전송
        { headers: { "Content-Type": "application/json" } }, // JSON 명시
      );
    }
  };

  return (
    <div>
      <div className={styles.top_bar}>
        <Image
          src="/images/arrow_back.svg"
          alt="뒤로가기"
          width={30}
          height={30}
          className={styles.arrow_back}
          onClick={handleGoBack}
        />
        <Image
          src="/images/home.svg"
          alt="홈으로"
          width={30}
          height={30}
          className={styles.home}
          onClick={handleGoHome}
        />
        {userData?.accountId === sellerId ? (
          <Image
            src="/images/more_vert.svg"
            alt="더보기"
            width={30}
            height={30}
            className={styles.more_vert}
            onClick={openModal}
          />
        ) : null}
        <MoreModal isOpen={isModalOpen} onClose={handleCloseModal} id={id} />
      </div>
      <ImageSlider images={productImages} settings={sliderSettings} />
      <div className={styles.profile_nick_div}>
        <div>
          {sellerData?.image ? (
            <Image
              src={sellerData?.image} // 실제 이미지 경로로 변경
              alt="Profile"
              width={50}
              height={50}
              className={styles.profile_img}
            />
          ) : null}
        </div>
        <div className={styles.nickname}>{sellerData?.name}</div>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.customSelectContainer}>
        <select
          className={styles.customSelect}
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="selling">판매중</option>
          <option value="reserved">예약중</option>
          <option value="sold">판매완료</option>
        </select>
      </div>
      <div className={styles.description_container}>
        <p className={styles.title}>{productData?.title}</p>
        <p className={styles.create_date}>
          {formatDate(productData?.createdAt)}
        </p>
        <span className={styles.buy_status}>
          {buyStatusLabels[buyStatus] || "알 수 없음"}
        </span>
        <span className={styles.use_period}>
          {periodLabels[usePeriod] || "알 수 없음"}
        </span>
        <div className={uploadCss.option_container}>
          <p className={uploadCss.option_p}>구성품</p>
          <div className={uploadCss.option_table}>
            <div className={uploadCss.option}>
              <Image
                src={
                  selectedOptions.includes(1)
                    ? "/images/cupholder_on.svg"
                    : "/images/cupholder_off.svg"
                }
                className={uploadCss.image}
                alt={"컵홀더"}
                width={50}
                height={50}
              />
              <p>컵홀더</p>
            </div>
            <div className={uploadCss.option}>
              <Image
                src={
                  selectedOptions.includes(2)
                    ? "/images/bassinet_on.svg"
                    : "/images/bassinet_off.svg"
                }
                className={uploadCss.image}
                alt={"베시넷"}
                width={50}
                height={50}
              />
              <p>베시넷</p>
            </div>
            <div className={uploadCss.option}>
              <Image
                src={
                  selectedOptions.includes(3)
                    ? "/images/footmuff_on.svg"
                    : "/images/footmuff_off.svg"
                }
                className={uploadCss.image}
                alt={"풋머프"}
                width={50}
                height={50}
              />
              <p>풋머프</p>
            </div>
            <div className={uploadCss.option}>
              <Image
                src={
                  selectedOptions.includes(4)
                    ? "/images/moskito_on.svg"
                    : "/images/moskito_off.svg"
                }
                className={uploadCss.image}
                alt={"모기장"}
                width={50}
                height={50}
              />
              <p>모기장</p>
            </div>
            <div className={uploadCss.option}>
              <Image
                src={
                  selectedOptions.includes(5)
                    ? "/images/raincover_on.svg"
                    : "/images/raincover_off.svg"
                }
                className={uploadCss.image}
                alt={"레인커버"}
                width={50}
                height={50}
              />
              <p>레인커버</p>
            </div>
            <div className={uploadCss.option}>
              <Image
                src={
                  selectedOptions.includes(6)
                    ? "/images/windcover_on.svg"
                    : "/images/windcover_off.svg"
                }
                className={uploadCss.image}
                alt={"방풍커버"}
                width={50}
                height={50}
              />
              <p>방풍커버</p>
            </div>
          </div>
        </div>

        <p className={styles.contents}>{productData?.content}</p>
      </div>

      <div className={styles.fixed_bottom_bar}>
        <Image
          src={
            !favorite
              ? "../images/favorite.png"
              : "../images/heart_with_border.svg"
          } // 실제 이미지 경로로 변경
          alt="favorite"
          width={30}
          height={30}
          className={styles.favorite_blank}
          onClick={changeFavorite}
        />
        <div style={{ fontSize: 20 }}>
          <FormattedPrice value={Number(productData?.price || 0)} />
        </div>
        {/* <button className={styles.chat_button}>채팅하기</button> */}
      </div>
    </div>
  );
}
