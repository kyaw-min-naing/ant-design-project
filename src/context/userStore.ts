import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",

  login: () => {
    set(() => ({ isAuthenticated: true }));
    localStorage.setItem("isAuthenticated", "true");
  },

  logout: () => {
    set(() => ({ isAuthenticated: false }));
    localStorage.removeItem("isAuthenticated");
  },
}));
