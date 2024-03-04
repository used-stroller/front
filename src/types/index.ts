import type React from "react";

interface FilterProviderProps {
  children: React.ReactNode;
}
interface FilterReq {
  keyword?: string;
  sourceType?: sourceType[];
  minPrice?: number | string;
  maxPrice?: number | string;
  region?: string;
  period?: number;
  model?: string[];
  brand?: string[];
  page?: number;
  size?: number;
  sort?: string;
}

type FilterAction = React.Dispatch<React.SetStateAction<FilterReq>>;
type HandleFilter = (ev: {
  target: { name: string; value: string | string[] | number };
}) => void;
type MinMaxPriceFilter = ({ key, minPrice, maxPrice }: MinMaxPrice) => void;
type Reset = (name: string) => void;

interface FilterContextType {
  filter: FilterReq;
  handleFilter: HandleFilter;
  minMaxPrice: MinMaxPriceFilter;
  reset: Reset;
}

enum sourceType {
  NAVER = "NAVER",
  CARROT = "CARROT",
  SECOND = "SECOND",
  BUNJANG = "BUNJANG",
  JUNGGO = "JUNGGO",
}

interface ProductRes {
  content: Content[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

interface Content {
  id: number;
  sourceType: string;
  pid: string;
  title: string;
  price: number;
  link: string;
  imgSrc: string;
  createdAt: string;
  updatedAt: string;
  releaseYear: number;
  etc: string;
  uploadDate: string;
  address: string;
  region: string;
  content: string;
}

interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Value {
  key: string;
  value: string | number;
}

type NumberValue = Record<string, number>;
type StringValue = Record<string, string>;
type FlexibleValue = string | number;

interface MinMaxPrice {
  key: string;
  minPrice: FlexibleValue;
  maxPrice: FlexibleValue;
}

type ValueOf<T> = T[keyof T];

export type {
  FilterProviderProps,
  FilterAction,
  FilterReq,
  HandleFilter,
  MinMaxPriceFilter,
  Reset,
  sourceType,
  ProductRes,
  Content,
  Sort,
  Value,
  NumberValue,
  StringValue,
  FlexibleValue,
  MinMaxPrice,
  FilterContextType,
  ValueOf,
};
