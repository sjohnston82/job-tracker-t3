import { create } from "zustand";

interface IUIStore {
  showUserNavMenu: boolean;
  openUserNavMenu: () => void;
  closeUserNavMenu: () => void;
}

export const useUIStore = create<IUIStore>((set) => ({
  showUserNavMenu: false,
  openUserNavMenu: () => set(() => ({ showUserNavMenu: true })),
  closeUserNavMenu: () => set(() => ({ showUserNavMenu: false })),
}));
