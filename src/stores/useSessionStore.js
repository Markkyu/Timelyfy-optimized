import { create } from "zustand";

const useSessionStore = create((set) => ({
  sessionExpired: false,
  setSessionExpired: (value) => set({ sessionExpired: value }),
}));

export default useSessionStore;
