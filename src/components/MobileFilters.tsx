import React, { type ReactElement, useCallback, useState } from "react";
import styles from "@/styles/page.module.css";
import ModalRegion from "./ModalRegion";
import {
  type FilterContextType,
  type MinMaxPrice,
  type StringValue,
} from "@/types";
import {
  BRAND_LIST,
  PERIOD_LIST,
  PRICE_LIST,
  SOURCE_TYPE_LIST,
} from "@/types/constants";
import Image from "next/image";

const MobileFilters = ({
  filter,
  handleFilter,
  minMaxPrice,
  reset,
}: FilterContextType): ReactElement => {
  const [activePrice, setActivePrice] = useState("ALL");
  const [activeSourceType, setActiveSourceType] = useState(["ALL"]);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback((): void => {
    setIsModalOpen(true);
  }, [isModalOpen]);
  const closeModal = useCallback((): void => {
    setIsModalOpen(false);
  }, [isModalOpen]);

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

  const handleSourceType = useCallback(
    (source: StringValue): void => {
      let prevArr = activeSourceType;
      if (source.key === "ALL") {
        prevArr = ["ALL"];
      } else if (activeSourceType.includes(source.value)) {
        // activeSourceType에 value가 있으면 제거
        prevArr = activeSourceType.filter(
          (sourceType) => sourceType !== source.value && sourceType !== "ALL",
        );
      } else {
        // activeSourceType에 value가 없으면 추가
        prevArr = activeSourceType.filter((sourceType) => sourceType !== "ALL");
        prevArr.push(source.value);
      }
      if (prevArr.length === 0) {
        prevArr = ["ALL"];
        source = SOURCE_TYPE_LIST[0];
      }
      setActiveSourceType(prevArr);
      handleFilter({
        target: {
          name: "sourceType",
          value: source.key === "ALL" ? "" : prevArr,
        },
      });
    },
    [activeSourceType],
  );

  const handleFilterReset = (): void => {
    reset("brand");
    reset("region");
    reset("sourceType");
    reset("period");
    reset("minPrice");
    reset("maxPrice");
    setActivePrice("ALL");
    setActiveSourceType(["ALL"]);
  };

  const isActive = (value: number | string | string[] | undefined): boolean =>
    !Array.isArray(value) &&
    value !== undefined &&
    value !== null &&
    value !== "ALL" &&
    value !== "";

  const isSiteActive: boolean =
    Array.isArray(filter.sourceType) && filter.sourceType?.length > 0;

  return (
    <div
      className={`${styles.m_filters_container} ${isSiteOpen && styles.show}`}
    >
      <ul>
        <li>
          <button className={styles.filter_reset} onClick={handleFilterReset}>
            <Image
              src="./images/icon_refresh.svg"
              alt="filter reset button"
              width={15}
              height={15}
            />
          </button>
        </li>
        <li
          className={`${styles.filter_item} ${isActive(filter.brand) && styles.active}`}
        >
          <select name={"brand"} value={filter.brand} onChange={handleFilter}>
            {BRAND_LIST.map((brand) => (
              <option key={brand} value={brand === "ALL" ? "" : brand}>
                {brand === "ALL" ? "브랜드" : brand}
              </option>
            ))}
          </select>
        </li>
        <li
          className={`${styles.filter_item} ${isActive(activePrice) && styles.active}`}
        >
          <select name={"minPrice"} value={activePrice} onChange={handlePrice}>
            {PRICE_LIST.map((price) => (
              <option key={price.key} value={price.key}>
                {price.key === "ALL" ? "가격" : price.key}
              </option>
            ))}
          </select>
        </li>
        <li
          className={`${styles.filter_item} ${isActive(filter.region) && styles.active}`}
          id={"region"}
        >
          <button className={styles.filter_item_region} onClick={openModal}>
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
        <li
          className={`${styles.filter_item} ${isSiteActive && styles.active}`}
        >
          <button
            onClick={() => {
              setIsSiteOpen(!isSiteOpen);
            }}
          >
            {isSiteActive && (
              <i className={styles.source_type_count}>
                {filter.sourceType?.length}
              </i>
            )}
            사이트
          </button>
        </li>
        <li
          className={`${styles.filter_item} ${isActive(filter.period) && styles.active}`}
        >
          <select name={"period"} value={filter.period} onChange={handleFilter}>
            {PERIOD_LIST.map((period) => (
              <option key={period.key} value={period.value}>
                {period.key === "ALL" ? "기간" : period.key}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <div className={`${isSiteOpen && styles.site_list_container}`}>
        {isSiteOpen &&
          SOURCE_TYPE_LIST.map((sourceType) => {
            return (
              <button
                className={`${styles.filter} ${
                  activeSourceType.includes(sourceType.value)
                    ? styles.active
                    : ""
                }`}
                key={sourceType.key}
                onClick={() => {
                  handleSourceType(sourceType);
                }}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") {
                    handleSourceType(sourceType);
                  }
                }}
              >
                {sourceType.key}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default MobileFilters;
