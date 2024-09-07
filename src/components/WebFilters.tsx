import React, {
  type ChangeEvent,
  type ReactElement,
  useCallback,
  useState,
} from "react";
import styles from "@/styles/page.module.css";
import Image from "next/image";
import {
  type FilterContextType,
  type MinMaxPrice,
  type StringValue,
  type Value,
} from "@/types";
import {
  BRAND_LIST,
  PERIOD_LIST,
  PRICE_LIST,
  REGION_LIST,
  SOURCE_TYPE_LIST,
} from "@/types/constants";

const WebFilters = ({
  filter,
  handleFilter,
  minMaxPrice,
  reset,
}: FilterContextType): ReactElement => {
  const [activeBrand, setActiveBrand] = useState(["ALL"]);
  const [activePrice, setActivePrice] = useState("ALL");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [activeRegion, setActiveRegion] = useState(["ALL"]);
  const [town, setTown] = useState("");
  const [activePeriod, setActivePeriod] = useState("ALL");
  const [activeSourceType, setActiveSourceType] = useState(["ALL"]);
  const [text, setText] = useState("");
  const [, setRender] = useState("");

  const handleBrand = useCallback(
    (value: string): void => {
      let prevArr = activeBrand;
      if (value === "ALL") {
        prevArr = ["ALL"];
      } else if (activeBrand.includes(value)) {
        // activeBrand에 value가 있으면 제거
        prevArr = activeBrand.filter(
          (brand) => brand !== value && brand !== "ALL",
        );
      } else {
        // activeBrand에 value가 없으면 추가
        prevArr = activeBrand.filter((brand) => brand !== "ALL");
        prevArr.push(value);
      }
      if (prevArr.length === 0) {
        prevArr = ["ALL"];
        value = "ALL";
      }
      setActiveBrand(prevArr);
      handleFilter({
        target: {
          name: "brand",
          value: value === "ALL" ? "" : prevArr,
        },
      });
    },
    [activeBrand],
  );

  const selectRegion = useCallback(
    (value: string): void => {
      let prevArr = activeRegion;
      setRender(text);
      setText("");
      if (value === "ALL") {
        prevArr = ["ALL"];
      } else if (activeRegion.includes(value)) {
        // activeRegion에 value가 있으면 제거
        prevArr = activeRegion.filter(
          (region) => region !== value && region !== "ALL",
        );
      } else {
        // activeBrand에 value가 없으면 추가
        prevArr = activeRegion.filter((region) => region !== "ALL");
        prevArr.push(value);
      }
      if (prevArr.length === 0) {
        prevArr = ["ALL"];
        value = "ALL";
      }
      setActiveRegion(prevArr);
      handleFilter({
        target: {
          name: "region",
          value: value === "ALL" ? "" : prevArr,
        },
      });
    },
    [activeRegion],
  );

  const handlePrice = useCallback(
    (price: MinMaxPrice): void => {
      setActivePrice(price.key);
      setMinPrice(Number(price.minPrice));
      setMaxPrice(Number(price.maxPrice));
      minMaxPrice(price);
    },
    [activePrice, minPrice, maxPrice],
  );

  const handleMinPrice = useCallback(
    (ev: ChangeEvent<HTMLInputElement>): void => {
      setMinPrice(Number(ev.target.value));
    },
    [minPrice],
  );

  const handleMaxPrice = useCallback(
    (ev: ChangeEvent<HTMLInputElement>): void => {
      setMaxPrice(Number(ev.target.value));
    },
    [maxPrice],
  );

  const handlePeriod = useCallback(
    (period: Value): void => {
      setActivePeriod(period.key);
      handleFilter({
        target: {
          name: "period",
          value: period.value === "ALL" ? "" : period.value,
        },
      });
    },
    [activePeriod],
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

  const textHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTown(event.target.value);
    const inputText = event.target.value;
    setText(inputText);
  };

  const searchRegion = useCallback((): void => {
    setActiveRegion(["ALL"]);
    handleFilter({
      target: {
        name: "region",
        value: town,
      },
    });
  }, [town]);

  return (
    <div className={styles.filters_container}>
      <div className={styles.filters_wrapper}>
        <h3>브랜드</h3>
        {BRAND_LIST.map((brand) => {
          return (
            <button
              className={`${styles.filter} ${
                activeBrand.includes(brand) ? styles.active : ""
              }`}
              key={brand}
              onClick={() => {
                handleBrand(brand);
              }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  handleBrand(brand);
                }
              }}
            >
              {brand}
            </button>
          );
        })}
      </div>
      <div className={styles.filters_wrapper}>
        <h3>가격</h3>
        {PRICE_LIST.map((price) => {
          return (
            <button
              className={`${styles.filter} ${
                activePrice === price.key ? styles.active : ""
              }`}
              key={price.key}
              onClick={() => {
                handlePrice(price);
              }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  handlePrice(price);
                }
              }}
            >
              {price.key}
            </button>
          );
        })}
        <div className={styles.price_wrapper}>
          직접입력
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            placeholder="최소가격"
            value={minPrice}
            onChange={handleMinPrice}
          />
          ~
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            placeholder="최대가격"
            value={maxPrice}
            onChange={handleMaxPrice}
          />
          <button
            className={styles.filter_inner_button}
            onClick={() => {
              if (maxPrice < minPrice) {
                alert("최소가격보다 큰 값을 입력해주세요");
                return;
              }
              const price: MinMaxPrice = {
                key: "직접입력",
                minPrice,
                maxPrice,
              };
              minMaxPrice(price);
            }}
          >
            <Image
              src="./images/filter_inner_search_button.svg"
              alt="filter search button"
              width={13}
              height={13}
            />
          </button>
        </div>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>동네</h3>
        <div className={styles.search_region}>
          <input
            type="text"
            value={text}
            name="region"
            placeholder="동네검색"
            onChange={textHandler}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                searchRegion();
              }
            }}
          />
          <button className={styles.filter_inner_button} onClick={searchRegion}>
            <Image
              src="./images/filter_inner_search_button.svg"
              alt="filter search button"
              width={13}
              height={13}
            />
          </button>
        </div>
      </div>
      <div className={styles.filters_wrapper}>
        <h3>지역</h3>
        {REGION_LIST.map((region) => {
          return (
            <button
              className={`${styles.filter} ${
                activeRegion.includes(region) ? styles.active : ""
              }`}
              key={region}
              onClick={() => {
                selectRegion(region);
              }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  selectRegion(region);
                }
              }}
            >
              {region}
            </button>
          );
        })}
      </div>
      <div className={styles.filters_wrapper}>
        <h3>기간</h3>
        {PERIOD_LIST.map((period) => {
          return (
            <button
              className={`${styles.filter} ${
                activePeriod === period.key ? styles.active : ""
              }`}
              key={period.key}
              onClick={() => {
                handlePeriod(period);
              }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  handlePeriod(period);
                }
              }}
            >
              {period.key}
            </button>
          );
        })}
      </div>
      <div className={styles.filters_wrapper}>
        <h3>사이트</h3>
        {SOURCE_TYPE_LIST.map((sourceType) => {
          return (
            <button
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
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WebFilters;
