import { create } from 'zustand';

export const useAppStore = create((set) => ({
    activePage: 1,
    setActivePage: (activePage: number) => set({ activePage }),
}));
