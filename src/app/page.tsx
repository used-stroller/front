import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <>
      <SearchBarFilter />
      <ProductList />
    </>
  );
}
