import { FilterProvider } from "@/context/FilterContext";
import SearchBarFilter from "@/components/SearchBarFilter";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import type { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <FilterProvider>
      <div className="main">
        <SearchBarFilter />
        <ProductList />
        <Footer />
      </div>
    </FilterProvider>
  );
}
