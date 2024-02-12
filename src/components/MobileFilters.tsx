import React, { type ReactElement, useCallback, useState } from "react";
import styles from "@/styles/page.module.css";
import ModalRegion from "./ModalRegion";
import { type FilterContextType, type MinMaxPrice } from "@/types";
import {
  BRAND_LIST,
  PERIOD_LIST,
  PRICE_LIST,
  SOURCE_TYPE_LIST,
} from "@/types/constants";

const MobileFilters = ({
  filter,
  handleFilter,
  minMaxPrice,
  reset,
}: FilterContextType): ReactElement => {
  const [activePrice, setActivePrice] = useState("ALL");
  const handlePrice = useCallback(
    (ev: { target: { value: string } }): void => {
      setActivePrice(ev.target.value);
      const findPrice: MinMaxPrice | undefined = PRICE_LIST.find(
        (price) => price.key === ev.target.value,
      );
      if (findPrice != null) {
        const { key, minPrice, maxPrice } = findPrice;
        minMaxPrice({ key, minPrice, maxPrice });
      } else {
        minMaxPrice(PRICE_LIST[0]); // ALL
      }
    },
    [activePrice],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback((): void => {
    setIsModalOpen(true);
  }, [isModalOpen]);
  const closeModal = useCallback((): void => {
    setIsModalOpen(false);
  }, [isModalOpen]);

  return (
    <div className={styles.m_filters_container}>
      <ul>
        <li className={styles.filter_title}>
          <select name={"brand"} value={filter.brand} onChange={handleFilter}>
            {BRAND_LIST.map((brand) => (
              <option key={brand} value={brand === "ALL" ? "" : brand}>
                {brand === "ALL" ? "브랜드" : brand}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title}>
          <select name={"minPrice"} value={activePrice} onChange={handlePrice}>
            {PRICE_LIST.map((price) => (
              <option key={price.key} value={price.key}>
                {price.key === "ALL" ? "가격" : price.key}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title} id={"region"}>
          <button className={styles.filter_title_region} onClick={openModal}>
            {filter.region === "" ? "동네" : filter.region}
          </button>
          <input name={"region"} type={"text"} onChange={handleFilter} />
          <ModalRegion
            isOpen={isModalOpen}
            closeModal={closeModal}
            handleFilter={handleFilter}
            reset={reset}
          />
        </li>
        <li className={styles.filter_title}>
          <select name={"period"} value={filter.period} onChange={handleFilter}>
            {PERIOD_LIST.map((period) => (
              <option key={period.key} value={period.value}>
                {period.key === "ALL" ? "기간" : period.key}
              </option>
            ))}
          </select>
        </li>
        <li className={styles.filter_title}>
          <select
            name={"sourceType"}
            value={filter.sourceType}
            onChange={handleFilter}
          >
            {SOURCE_TYPE_LIST.map((sourceType) => (
              <option key={sourceType.key} value={sourceType.value}>
                {sourceType.key === "ALL" ? "사이트별" : sourceType.key}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </div>
  );
};

export default MobileFilters;
