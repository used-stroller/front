import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";

const FormattedPrice = ({ value }: { value: number }): ReactElement => {
  const formattedValue = value.toLocaleString("ko-KR");
  return <span className={styles.price}>{formattedValue}</span>;
};

export default FormattedPrice;
