"use client";

import styles from "@/styles/page.module.css";
import InfinityScroll from "@/components/InfinityScroll";
import SearchResult from "@/components/SearchResult";
import React, { type ReactElement, useState } from "react";

const ProductList = (): ReactElement => {
  const [resultCount, setResultCount] = useState(0);

  return (
    <div>
      <SearchResult resultCount={resultCount} />
      <div className={styles.product_container}>
        <InfinityScroll setResultCount={setResultCount} />
      </div>
    </div>
  );
};

export default ProductList;
