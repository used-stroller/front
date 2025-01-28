"use client";

import styles from "@/styles/productDetail.module.css";
import ImageSlider from "@/components/ImageSlider";
import { useEffect, useState } from 'react';
import apiClient from '@/utils/apiClient';
import Image from "next/image";
import { imageObj, type Content } from '@/types';
import FormattedPrice from '@/components/FormattedPrice';
import { useRouter } from 'next/navigation';
import MoreModal from '@/components/MoreModal';

export default function ProductDetail({ params }: number) {
  const [selectedValue, setSelectedValue] = useState<string>("거래완료");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [productData, setProductData] = useState<Content | null>(null);
  const [productImages, setProductImages] = useState<string[]>([process.env.NEXT_PUBLIC_BASE_URL+"/images/default_thumbnail.svg"]);
  const { id } = params; // 동적 URL 파라미터 가져오기
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const sliderSettings = {
    arrows: true, // 이전/다음 화살표 표시
  };

  const handleGoBack = () => {
    router.back();
  }
  const handleGoHome = () => {
    router.push("/");
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("user/mypage");
        setUserData(response.data.data);
      } catch (err: any) {
        console.log("데이터 가져오기 실패");
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiClient.get("product/get/" + id);
        setProductData(response.data);
        const imageList = response.data.imageList;
        const imageArray = imageList.map((image) => image.src);
        console.log(imageArray);
        setProductImages(imageArray)
      } catch (err: any) {
        console.log("데이터 가져오기 실패");
      }
    };
    fetchProductData();
  }, []);


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
    };

    function formatDate(date: string): string {
      return date?.substring(0,10).replaceAll(/^20/g, "").replaceAll("-", ".");
    }

  return (
    <div>
      <div className={styles.top_bar}>
      <Image src = "/images/arrow_back.svg" alt="뒤로가기" width={30} height={30} className={styles.arrow_back} onClick={handleGoBack}/>
      <Image src = "/images/home.svg" alt="홈으로" width={30} height={30} className={styles.home} onClick={handleGoHome}/>
      <Image src = "/images/more_vert.svg" alt="더보기" width={30} height={30} className={styles.more_vert} onClick={openModal}/>
      <MoreModal isOpen={isModalOpen} onClose={closeModal}/>
      </div>
      <ImageSlider images={productImages} settings={sliderSettings} />
      <div className={styles.profile_nick_div}>
        <div>
          <Image
            src={userData?.image} // 실제 이미지 경로로 변경
            alt="Profile"
            width={50}
            height={50}
            className={styles.profile_img}
          />
        </div>
        <div className={styles.nickname}>{userData?.name}</div>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.customSelectContainer}>
          <select className={styles.customSelect} value={selectedValue} onChange={handleChange}>
              <option value="selling">판매중</option>
              <option value="reserved">예약중</option>
              <option value="sold">판매완료</option>
          </select>
      </div>
      <div className={styles.description_container}>
        <p className={styles.title}>{productData?.title}</p>
        <p className={styles.create_date}>{formatDate(productData?.createdAt)}</p>
        <p className={styles.contents}>{productData?.content}</p>
      </div>
        

          <div className={styles.fixed_bottom_bar}>
            <Image
                src="../images/favorite.png" // 실제 이미지 경로로 변경
                alt="favorite"
                width={30}
                height={30}
                className={styles.favorite_blank}
              />
              <div style={{fontSize: 20}}>
              <FormattedPrice  value={Number(productData?.price || 0)} />
              </div>
              <button className={styles.chat_button} >채팅하기</button>
          </div>

      </div>
  );
}
