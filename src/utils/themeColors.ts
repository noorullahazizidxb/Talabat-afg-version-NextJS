/**
 * Centralized theme colors for the Talabat UI
 * This file provides a single source of truth for all theme colors
 * used throughout the application.
 */

// Theme color palette
export const themeColors = {
  // Primary brand colors
  primary: {
    light: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Base orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    dark: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    }
  },
  
  // Accent colors (lime for highlights)
  accent: {
    light: {
      300: '#bef264',
      400: '#a3e635',
      500: '#84cc16',
    },
    dark: {
      300: '#d9f99d',
      400: '#bef264',
      500: '#a3e635',
    }
  },
  
  // Background colors
  background: {
    light: {
      primary: '#ffffff',
      secondary: '#fff7ed', // Light orange tint
      tertiary: '#ffedd5',
    },
    dark: {
      primary: '#0f172a', // Dark blue/slate
      secondary: '#1e293b',
      tertiary: '#334155',
    }
  },
  
  // Text colors
  text: {
    light: {
      primary: '#1e293b',
      secondary: '#475569',
      tertiary: '#64748b',
      inverted: '#ffffff',
    },
    dark: {
      primary: '#f8fafc',
      secondary: '#e2e8f0',
      tertiary: '#cbd5e1',
      inverted: '#0f172a',
    }
  },
  
  // UI element colors
  ui: {
    light: {
      navbar: '#f97316', // Orange
      footer: '#fff7ed',
      card: '#ffffff',
      border: '#fed7aa',
    },
    dark: {
      navbar: '#7c2d12', // Dark orange
      footer: '#1e293b',
      card: '#334155',
      border: '#475569',
    }
  }
};

/**
 * Helper function to get theme color based on current theme
 * @param colorPath Path to the color in the themeColors object
 * @param isDark Whether dark mode is active
 */
export const getThemeColor = (
  colorPath: string, 
  isDark: boolean
): string => {
  const mode = isDark ? 'dark' : 'light';
  const parts = colorPath.split('.');
  
  // Navigate through the themeColors object
  let result: any = themeColors;
  for (const part of parts) {
    if (result[part] === undefined) {
      console.warn(`Theme color path "${colorPath}" is invalid`);
      return '';
    }
    result = result[part];
  }
  
  // Return the color for the current theme mode
  return result[mode] || result;
};
