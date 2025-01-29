import { type image } from "@/types";
import { create } from "zustand";

interface FormState {
  selectedStatus: string;
  selectedPeriod: string;
  selectedOptions: number[];
  text: string;
  images: image[];

  setSelectedStatus: (value: string) => void;
  setSelectedPeriod: (value: string) => void;
  setSelectedOptions: (updater: (prev: number[]) => number[]) => void; // 함수형 업데이트를 지원하도록 타입 정의
  setText: (value: string) => void;
  setImages: (value: image[]) => void;
}

export const useUploadForm = create<FormState>((set) => ({
  selectedStatus: "새상품",
  selectedPeriod: "1",
  selectedOptions: [],
  text: "",
  images: [],
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
}));
