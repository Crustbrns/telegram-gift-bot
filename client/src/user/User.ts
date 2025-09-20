import { create } from "zustand";

type LastWinsStore = {
  lastwins: string[];
  addWin: (gift: string) => void;
  removeLast: () => void;
  clear: () => void;
};


export const useLastWinsStore = create<LastWinsStore>((set) => ({
  lastwins: [],
  addWin: (gift) =>
    set((state) => ({ lastwins: [...state.lastwins, gift] })),

  removeLast: () =>
    set((state) => ({ lastwins: state.lastwins.slice(0, -1) })),

  clear: () => set({ lastwins: [] }),
}));


type ObDemoStore = {
  obdemo: boolean;
  update: (truth: boolean) => void;
  clear: () => void;
};

export const useObDemoStore = create<ObDemoStore>((set) => ({
  obdemo: false,
  update: (truth) =>
    set(() => ({ obdemo: truth })),

  clear: () => set({ obdemo: false }),
}));