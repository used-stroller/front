import SearchBarFilter from "@/components/SearchBarFilter";
import ProductList from "@/components/ProductList";
import { type ReactElement } from "react";
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import AiBar from "@/components/AiBar";
import KeywordInitializer from "@/components/KeywordInitializer";

export default async function Home(): Promise<ReactElement> {
  return (
    <>
      <Header />
      <KeywordInitializer />
      <SearchBarFilter />
      <AiBar />
      <ProductList />
      <FloatingButton />
    </>
  );
}
