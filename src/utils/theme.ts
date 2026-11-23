import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useThemeTokens } from '@/theme/ThemeTokensProvider';
import { themeColors, getThemeColor } from './themeColors';

// Utility function to merge tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const {
    modePreference,
    resolvedMode,
    activeTokens,
    setModePreference,
  } = useThemeTokens();
  
  const theme = modePreference as Theme;
  const resolvedTheme = resolvedMode as 'light' | 'dark';

  const colorPathMap: Record<string, keyof typeof activeTokens> = {
    'background.primary': 'background',
    'background.secondary': 'surface',
    'text.primary': 'text',
    'text.secondary': 'textMuted',
    'ui.border': 'border',
    'ui.navbar': 'primary',
    'ui.footer': 'surface',
    'accent.500': 'accent',
    'primary.500': 'primary',
  };

  const getColor = (colorPath: string) => {
    const mappedKey = colorPathMap[colorPath];

    if (mappedKey) {
      return activeTokens[mappedKey];
    }

    return getThemeColor(colorPath, resolvedTheme === 'dark');
  };

  const toggleTheme = () => {
    const newTheme: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setModePreference(newTheme);
  };

  const setThemeValue = (newTheme: Theme) => {
    setModePreference(newTheme);
  };

  return { 
    theme, 
    resolvedTheme, 
    toggleTheme, 
    setTheme: setThemeValue,
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark',
    getColor, // Expose the getColor function
    colors: themeColors // Expose the theme colors object
  };
};
