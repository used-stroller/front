"use client";
import axios from "axios";
import type { DefaultRegionType, FilterReq, ProductRes } from "@/types";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getProductList = async (
  filter: FilterReq,
  defaultRegion?: DefaultRegionType,
): Promise<ProductRes> => {
  const queryParams = createQueryParams(filter);
  // if (defaultRegion != null) {
  //   queryParams =
  //     queryParams +
  //     "&fixedAddress=" +
  //     defaultRegion.fixedAddress +
  //     "&detailAddress=" +
  //     defaultRegion.detailAddress;
  // }

  // queryParams가 빈 문자열인지 명확하게 확인
  const url = `/api/product/list${queryParams !== "" ? queryParams : ""}`;
  return await axiosClient.get(url).then((r) => r.data);
};

export const getRecommendProductList = async (
  page = 0,
  size = 20,
): Promise<ProductRes> => {
  return await axiosClient
    .get(`/api/product/list/recommend?page=${page}&size=${size}`)
    .then((r) => r.data);
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

export const getLocation = async (
  longitude: number | null,
  latitude: number | null,
): Promise<{ fixedAddress: string; detailAddress: string }> => {
  if (longitude == null || latitude == null) {
    return { fixedAddress: "", detailAddress: "" };
  }
  const fixed = new Set<string>();
  const detail = new Set<string>();
  const nearGeoNum = [];
  const nearNum = [-0.01, 0, 0.01];
  for (const num1 of nearNum) {
    for (const num2 of nearNum) {
      const nearLongitude = longitude + num1;
      const nearLatitude = latitude + num2;
      nearGeoNum.push({ nearLongitude, nearLatitude });
    }
  }
  // for (const { nearLongitude, nearLatitude } of nearGeoNum) {
  //   url = `${VWORLD_API_URL}${VWORLD_API_PARAMS}${nearLongitude},${nearLatitude}`;
  //   try {
  //     const result: ResultType[] = await axios
  //       .get(url)
  //       .then((r) => r.data.response.result);
  //     result.forEach((r) => {
  //       if (r.structure.level1.length > 0) {
  //         const cleansed =
  //           cleansedLevel1[r.structure.level1] ?? r.structure.level1;
  //         fixed.add(cleansed);
  //       }
  //       if (r.structure.level3.length > 0) {
  //         detail.add(r.structure.level3);
  //       }
  //       if (r.structure.level4A.length > 0) {
  //         detail.add(r.structure.level4A);
  //       }
  //       if (r.structure.level4L.length > 0) {
  //         detail.add(r.structure.level4L);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error fetching location data: ", error);
  //   }
  // }
  return {
    fixedAddress: [...fixed].join(","),
    detailAddress: [...detail].join(","),
  };
};

export const isMobile = (): boolean => {
  let userAgent = "";
  if (
    navigator.userAgent !== undefined &&
    navigator.userAgent !== null &&
    navigator.userAgent !== ""
  ) {
    userAgent = navigator.userAgent;
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return true;
  }

  if (/android/i.test(userAgent)) {
    return true;
  }

  const mobileDeviceRegex =
    /Mobile|Opera Mini|IEMobile|WPDesktop|Windows Phone|webOS|BlackBerry|BB10|PlayBook|Silk|Kindle/;
  if (mobileDeviceRegex.test(userAgent)) {
    return true;
  }

  return false;
};
