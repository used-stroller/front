import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import type { ReactElement } from "react";
import ReactGA from "react-ga";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const gaTrackingId: string = process.env.REACT_APP_GA_TRACKING_ID!; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정
export default function Home(): ReactElement {
  return (
    <>
      <SearchBarFilter />
      <ProductList />
    </>
  );
}
