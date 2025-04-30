import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CardSettings {
  padding: string;
  rounded: string;
  shadow: string;
  border: string;
  darkBorder: string;
  background: string;
  darkBackground: string;
  hover: string;
  darkHover: string;
}

export interface ButtonSettings {
  base: string;
  primary: string;
  secondary: string;
  icon: string;
}

export interface InputSettings {
  base: string;
  dark: string;
}

export interface BadgeSettings {
  base: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  darkSuccess: string;
  darkWarning: string;
  darkError: string;
  darkInfo: string;
}

export interface TableSettings {
  header: string;
  row: string;
  darkHeader: string;
  darkRow: string;
  border: string;
  darkBorder: string;
}

interface SettingsState {
  card: CardSettings;
  button: ButtonSettings;
  input: InputSettings;
  badge: BadgeSettings;
  table: TableSettings;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    () => ({
      card: {
        padding: 'p-6',
        rounded: 'rounded-xl',
        shadow: 'shadow-sm',
        border: 'border border-gray-200',
        darkBorder: 'border border-gray-700',
        background: 'bg-white',
        darkBackground: 'bg-gray-800',
        hover: 'hover:bg-gray-50',
        darkHover: 'hover:bg-gray-700',
      },
      button: {
        base: 'px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:opacity-90 flex items-center gap-2',
        primary: 'text-white',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
        icon: 'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
      },
      input: {
        base: 'px-4 py-2 rounded-lg border w-full focus:outline-none transition-all duration-300',
        dark: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400',
      },
      badge: {
        base: 'px-2 py-0.5 rounded-full text-xs inline-flex items-center gap-1',
        success: 'bg-green-50 text-green-700',
        warning: 'bg-yellow-50 text-yellow-700',
        error: 'bg-red-50 text-red-700',
        info: 'bg-blue-50 text-blue-700',
        darkSuccess: 'bg-green-900/30 text-green-400',
        darkWarning: 'bg-yellow-900/30 text-yellow-400',
        darkError: 'bg-red-900/30 text-red-400',
        darkInfo: 'bg-blue-900/30 text-blue-400',
      },
      table: {
        header: 'text-left pb-4 font-normal',
        row: 'py-4',
        darkHeader: 'text-left pb-4 font-normal text-gray-400',
        darkRow: 'py-4 text-gray-300',
        border: 'border-b border-gray-100',
        darkBorder: 'border-b border-gray-700',
      },
    }),
    {
      name: 'settings-storage',
    }
  )
);