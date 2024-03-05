import type { MinMaxPrice, StringValue, Value } from "@/types/index";

export const BRAND_LIST: string[] = [
  "ALL",
  "RYAN",
  "오이스터",
  "부가부",
  "타보",
  "스토케",
  "에그",
  "와이업",
  "잉글레시나",
  "씨투엠뉴",
  "실버크로스",
  "오르빗베이비",
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
  { key: "네이버", value: "NAVER" },
  { key: "당근", value: "CARROT" },
  { key: "번개장터", value: "BUNJANG" },
  { key: "세컨웨어", value: "SECOND" },
  { key: "중고나라", value: "JUNGGO" },
];
