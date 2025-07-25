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
  defaultRegion?: string;
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
type ResetAllFilters = () => void;

interface FilterContextType {
  filter: FilterReq;
  handleFilter: HandleFilter;
  minMaxPrice: MinMaxPriceFilter;
  reset: Reset;
  resetAllFilters: ResetAllFilters;
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
  model: Model;
}

interface Model {
  id: number;
  name: string;
  brand: string;
  price: string;
  newPrice: string;
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

interface StructureType {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4L: string;
  level4A: string;
}

interface ResultType {
  zipcode: string;
  text: string;
  structure: StructureType;
}

interface MyUserType {
  email?: string;
  password?: string;
  nickname?: string;
  address?: string;
}

interface UserResponse {
  status: string;
  statusCode: number;
  success: boolean;
  message: string;
}

interface image {
  name: string;
  src: string;
  url: string;
  file: File;
}

interface userData {
  data: any;
  accountId: string;
  favorites: Content[];
  image: string;
  sellingList: Content[];
  name: string;
}

interface imageObj {
  id: number;
  src: string;
  orderSeq: number;
}

interface RentalData {
  id: number;
  code: string;
  productName: string;
  grade: string;
  src: string;
  color: string;
  rentalPrice: number;
  rentable: boolean;
  productionDate: string;
  description: string;
  descriptionImage: string;
  rentalImages: RentalImage[];
  strollerType: string;
  weight: number;
  size: string;
  rentalStart?: string;
  rentalEnd?: string;
}

interface RentalImage {
  id: number;
  src: string;
  rentalId: number;
  orderSeq: number;
}

export type {
  UserResponse,
  MyUserType,
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
  Model,
  StructureType,
  ResultType,
  DefaultRegionType,
  image,
  imageObj,
  userData,
  RentalData,
  RentalImage,
};
