import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import { type Model } from "@/types";

const BrandNewPrice = ({ value }: { value: Model }): ReactElement => {
  if (value != null) {
    const stringToInt = parseInt(value.price);
    const formattedValue = stringToInt.toLocaleString("ko-KR");
    return <span className={styles.new_price}>{formattedValue}원</span>;
  }
  return <span></span>;
};

export default BrandNewPrice;
