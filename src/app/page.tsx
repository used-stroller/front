import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import { type ReactElement } from "react";
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import AiBar from "@/components/AiBar";

export default async function Home(): Promise<ReactElement> {
  return (
    <>
      <Header />
      <SearchBarFilter />
      <AiBar />
      <ProductList />
      <FloatingButton />
    </>
  );
}
