import { create } from "zustand";

interface IJobInfoStore {
  locationRadioSelection: "remote" | "usbased" | "outsideus";
  setLocationRadioSelection: (
    value: "remote" | "usbased" | "outsideus",
  ) => void;
  city: string;
  state: string;
  country: string;
  setCity: (value: string) => void;
  setCountry: (value: string) => void;
  setState: (value: string) => void;
}

export const useJobInfoStore = create<IJobInfoStore>((set) => ({
  locationRadioSelection: "remote",
  setLocationRadioSelection: (value) => set({ locationRadioSelection: value }),
  city: "",
  state: "",
  country: "",
  setCity: (value) => set({ city: value }),
  setState: (value) => set({ state: value }),
  setCountry: (value) => set({ country: value }),
}));
