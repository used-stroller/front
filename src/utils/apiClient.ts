"use client";
import axios, { type InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true, // 쿠키를 요청에 포함하기 위해 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// jwt 토큰을 헤더에 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 브라우저 쿠키에서 JWT 토큰 가져오기
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }

    return config;
  },
  async (error): Promise<never> => {
    return await Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    // 정상적인 응답 처리
    return response;
  },
  async (error) => {
    // 에러 응답 처리
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        // 401 또는 403 상태 코드일 때 리다이렉트
        window.location.href = "/signin";
      }
    }
    // 에러를 계속 throw하여 호출한 쪽에서 추가 처리 가능
    return await Promise.reject(error);
  },
);

// 응답 인터셉터 추가
export default apiClient;
