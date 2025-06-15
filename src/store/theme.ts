import { create } from "zustand";
import { persist } from "zustand/middleware";
type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        document.getElementsByTagName("html")[0]!.className = theme
        return set({ theme })
      },
    }),
    {
      name: 'theme-store',
    }
  )
);
