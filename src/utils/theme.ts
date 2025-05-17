import { useState, useEffect } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { themeColors, getThemeColor } from './themeColors';

// Utility function to merge tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  
  // Function to get a theme color using the centralized palette
  const getColor = (colorPath: string) => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return getThemeColor(colorPath, currentTheme === 'dark');
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to system theme if no saved preference
      setTheme('system');
    }

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
  }, [theme, systemTheme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Set specific theme
  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Get the actual theme (resolving 'system' to either light or dark)
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

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
