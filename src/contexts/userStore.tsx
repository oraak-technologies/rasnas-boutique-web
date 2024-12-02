// store/store.ts
import { create } from 'zustand';

interface CounterState {
  country: string; 
  changeCountry: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  country: "IN", // Initialize with a string value
  changeCountry: () => set((state) => ({ country: state.country === "IN" ? "KWT" : "IN" })),
}));

export default useCounterStore;
