import { create } from 'zustand';
import { theme as defaultTheme, Theme } from '../styles/theme';

interface ThemeStore {
  theme: Theme;
  isNavCollapsed: boolean;
  isDarkMode: boolean;
  updateTheme: (newTheme: Partial<Theme>) => void;
  toggleNav: () => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: defaultTheme,
  isNavCollapsed: true, // Set default to true for mobile-first
  isDarkMode: false,
  updateTheme: (newTheme) =>
    set((state) => ({
      theme: {
        ...state.theme,
        ...newTheme,
      },
    })),
  toggleNav: () => set((state) => ({ isNavCollapsed: !state.isNavCollapsed })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));