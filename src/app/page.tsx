import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import { type ReactElement } from "react";
import Header from "@/components/Header";

export default async function Home(): Promise<ReactElement> {
  return (
    <>
      <Header />
      <SearchBarFilter />
      <ProductList />
    </>
  );
}
