import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import type { ReactElement } from "react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-B2KK9DNYZ1");
ReactGA.send("pageview");
export default function Home(): ReactElement {
  return (
    <>
      <SearchBarFilter />
      <ProductList />
    </>
  );
}
