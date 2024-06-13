import type { MinMaxPrice, StringValue, Value } from "@/types/index";

export const BRAND_LIST: string[] = [
  "ALL",
  "부가부",
  "스토케",
  "잉글레시나",
  "리안",
  "줄즈",
  "오이스터",
  "타보",
  "에그",
  "와이업",
  "씨투엠뉴",
  "실버크로스",
  "SEEC",
  "다이치",
  "싸이벡스",
  "뉴나",
  "엔픽스",
];

export const PRICE_LIST: MinMaxPrice[] = [
  { key: "ALL", minPrice: "", maxPrice: "" },
  { key: "0~10만원", minPrice: 0, maxPrice: 100000 },
  { key: "10만원~30만원", minPrice: 100000, maxPrice: 300000 },
  { key: "30만원~50만원", minPrice: 300000, maxPrice: 500000 },
  { key: "50만원이상", minPrice: 500000, maxPrice: "" },
];

export const PERIOD_LIST: Value[] = [
  { key: "ALL", value: "" },
  { key: "1일", value: 1 },
  { key: "3일", value: 3 },
  { key: "일주일", value: 7 },
  { key: "한달", value: 30 },
];

export const SOURCE_TYPE_LIST: StringValue[] = [
  { key: "ALL", value: "ALL" },
  { key: "당근", value: "CARROT" },
  { key: "번개장터", value: "BUNJANG" },
  { key: "세컨웨어", value: "SECOND" },
  { key: "중고나라", value: "JUNGGO" },
  { key: "네이버", value: "NAVER" },
];

export const REGION_LIST: string[] = [
  "ALL",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충청북도",
  "충청남도",
  "전라남도",
  "전라북도",
  "경상남도",
  "경상북도",
  "제주",
];

export const cleansedLevel1: Record<string, string> = {
  강원특별자치도: "강원도",
  경기도: "경기도",
  경상남도: "경남",
  경상북도: "경북",
  광주광역시: "광주",
  대구광역시: "대구",
  대전광역시: "대전",
  부산광역시: "부산",
  서울특별시: "서울",
  세종특별자치시: "세종시",
  울산광역시: "울산",
  인천광역시: "인천",
  전라남도: "전남",
  전북특별자치도: "전북",
  제주특별자치도: "제주",
  충청남도: "충남",
  충청북도: "충북",
};
