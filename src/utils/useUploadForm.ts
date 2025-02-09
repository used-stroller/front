import { type image } from "@/types";
import { create } from "zustand";

interface FormState {
  selectedStatus: string;
  selectedPeriod: number;
  selectedOptions: number[];
  text: string;
  images: image[];
  deleted: number[];

  setSelectedStatus: (value: string) => void;
  setSelectedPeriod: (value: number) => void;
  setSelectedOptions: (updater: (prev: number[]) => number[]) => void; // 함수형 업데이트를 지원하도록 타입 정의
  setText: (value: string) => void;
  setImages: (value: image[]) => void;
  setDeleted: (updater: (prev: number[]) => number[]) => void; // 함수형 업데이트를 지원하도록 타입 정의
  
}

export const useUploadForm = create<FormState>((set) => ({
  selectedStatus: "새상품",
  selectedPeriod: 1,
  selectedOptions: [],
  text: "",
  images: [],
  deleted: [],
  setSelectedStatus: (value) => {
    set({ selectedStatus: value });
  },
  setSelectedPeriod: (value) => {
    set({ selectedPeriod: value });
  },
  setSelectedOptions: (updater) => {
    set((state) => ({
      selectedOptions: updater(state.selectedOptions),
    }));
  },
  setText: (value) => {
    set({ text: value });
  },
  setImages: (value) => {
    set({ images: value });
  },
  setDeleted: (updater) => {
    set((state) => ({
      deleted: updater(state.deleted), // updater 함수 사용
    }));
  },
}));
