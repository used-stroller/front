import styles from "@/styles/about.module.css";
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
          <h2>
            똑똑한 엄빠의 선택을 도와주는 <b>중모차</b>
          </h2>
          <p>
            안녕하세요! 2살 애기를 키우는 로운이 아빠에요.
            <br />
            <br />
            중고 유모차는 대부분 상태도 좋고 관리도 잘 되어 있어서, <br />
            중고 유모차를 사게되면 상당한 금액을 절약할 수 있어요.
            <br />이 돈으로 아기에게 정말 필요한 것들을 사주자구요.
          </p>
          <p>
            <br />
            최저가 검색, 브랜드별 검색, 사이트별 검색 기능 등 손쉽게 원하는
            상품을 찾아보세요.
          </p>
          <p>제휴 및 문의사항이 있으신 분은 아래 메일로 연락주세요.</p>
          <p>hoonyhoeny@gmail.com</p>
          <Link href={"/"}>홈으로</Link>
        </div>
      )}
    </div>
  );
};

export default Ad;
