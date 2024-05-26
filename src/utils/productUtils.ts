import axios from "axios";
import type { FilterReq, ProductRes } from "@/types";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export const getProductList = async (
  filter: FilterReq,
  defaultRegion?: string,
): Promise<ProductRes> => {
  let queryParams = createQueryParams(filter);
  if (defaultRegion != null) {
    queryParams = queryParams + "&defaultRegion=" + defaultRegion;
  }
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

const VWORLD_API_URL = process.env.NEXT_PUBLIC_VWORLD_API_URL;
const VWORLD_API_KEY = process.env.NEXT_PUBLIC_VWORLD_API_KEY;
const VWORLD_API_PARAMS: string = `?service=address&request=getAddress&version=2.0&crs=epsg:4326&type=both&zipcode=true&simple=true&key=${VWORLD_API_KEY}&point=`;

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

export const getLocation = async (
  longitude: number | null,
  latitude: number | null,
): Promise<string> => {
  const url = `${VWORLD_API_URL}${VWORLD_API_PARAMS}${longitude},${latitude}`;
  const address = new Set<string>();
  try {
    const result: ResultType[] = await axios
      .get(url)
      .then((r) => r.data.response.result);
    result.forEach((r) => {
      if (r.structure.level3.length > 0) {
        address.add(r.structure.level3);
      }
      if (r.structure.level4A.length > 0) {
        address.add(r.structure.level4A);
      }
      if (r.structure.level4L.length > 0) {
        address.add(r.structure.level4L);
      }
    });
  } catch (error) {
    console.error("Error fetching location data: ", error);
  }
  return [...address].join(",");
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
