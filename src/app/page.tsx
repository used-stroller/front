import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import { type ReactElement } from "react";

export default async function Home(): Promise<ReactElement> {
  return (
    <>
      <SearchBarFilter />
      <ProductList />
    </>
  );
}
