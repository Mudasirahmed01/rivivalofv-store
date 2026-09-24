import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const getInitialTheme = (): boolean => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: getInitialTheme(),
  
  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.isDark;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return { isDark: newTheme };
    });
  },
  
  setTheme: (isDark: boolean) => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    set({ isDark });
  },
}));
