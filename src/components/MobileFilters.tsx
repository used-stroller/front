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
  const [activeSourceType, setActiveSourceType] = useState(["ALL"])
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const showSites = useCallback((): void => {
    setIsSiteOpen(true)
  }, [isSiteOpen])

  const handleSourceType = useCallback(
    (source: StringValue): void => {
      let prevArr = activeSourceType;
      console.log(prevArr)
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
        <li className={styles.filter_title} onClick={() => setIsSiteOpen(!isSiteOpen)}>사이트별
        </li>
      </ul>
      <li className={`${styles.site_list_container} ${isSiteOpen ? styles.show : ""}`}>
      {isSiteOpen && SOURCE_TYPE_LIST.map((sourceType) => {
          return (
            <span
              className={`${styles.filter} ${
                activeSourceType.includes(sourceType.value) ? styles.active : ""
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
            </span>
          );
        })}
      </li>
    </div>
  );
};

export default MobileFilters;
