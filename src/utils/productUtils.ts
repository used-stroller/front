import axios from "axios";
import type { FilterReq, ProductRes } from "@/types";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8080/product",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export const getProductList = async (
  filter: FilterReq,
): Promise<ProductRes> => {
  console.log("filter: ", filter);
  const queryParams = createQueryParams(filter);
  return await axiosClient.get(`/list${queryParams}`).then((r) => r.data);
};

export const getImageUrl = (imgSrc: string): string => {
  return imgSrc.startsWith("http") ? imgSrc : "/images/default_thumbnail.svg";
};

export const createQueryParams = (filter: FilterReq): string => {
  const params = new URLSearchParams();
  Object.keys(filter).forEach((key) => {
    const value = filter[key as keyof FilterReq];
    if (value != null) {
      if (typeof value === "number") {
        params.append(key, value.toString());
      } else if (Array.isArray(value)) {
        params.append(key, value.join(","));
      } else {
        params.append(key, value);
      }
    }
  });
  return `?${params.toString()}`;
};
