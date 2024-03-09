import styles from "@/styles/page.module.css";
import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";

const sponsorAd = {
  isView: false,
  title: "",
  link: "",
  image: "/images/ad_example.jpg",
};

const Ad = (): ReactElement | boolean => {
  return (
    <div className={sponsorAd.isView ? styles.ad_banner : styles.ad_empty}>
      {sponsorAd.isView ? (
        <Link href={sponsorAd.link} className={styles.ad_banner_link}>
          <Image src={sponsorAd.image} alt={sponsorAd.title} fill priority />
        </Link>
      ) : (
        <div>
          <p>중고 유모차의 모든 것을 한 곳에서 볼 수 있는 중모차입니다.</p>
          <p>
            당근, 중고나라, 번개장터, 세컨웨어(구 헬로마켓), 네이버까지 한 눈에
            확인할 수 있습니다.
          </p>
          <p>
            최저가 검색, 브랜드별 검색, 사이트별 검색 기능 등 손쉽게 원하는
            상품을 찾아보세요.
          </p>
          <p>제휴 및 기타 문의사항이 있으신 분은는 아래 메일로 연락주세요.</p>
          <Link href={"/"}>홈으로</Link>
        </div>
      )}
    </div>
  );
};

export default Ad;
