'use client'

/**
 * Navigation utilities to ensure safe navigation throughout the application
 */

/**
 * Ensures a path is a valid string for navigation
 * @param path The path to sanitize
 * @param defaultPath The default path to use if the provided path is invalid
 * @returns A safe path string
 */
export const getSafePath = (path: unknown, defaultPath: string = '/'): string => {
  if (typeof path === 'string' && path.trim().length > 0) {
    return path;
  }
  return defaultPath;
};

/**
 * Builds a URL with query parameters
 * @param base The base URL
 * @param params Object containing query parameters
 * @returns A complete URL with query parameters
 */
export const buildUrl = (base: string, params: Record<string, string>): string => {
  try {
    const url = new URL(base, window.location.origin);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.pathname + url.search;
  } catch (e) {
    // If URL construction fails, return the base with added params
    const queryString = Object.entries(params)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
      
    return queryString ? `${base}?${queryString}` : base;
  }
};

/**
 * Creates a return URL for authentication redirects
 * @param currentPath The current path
 * @returns An encoded return URL
 */
export const createReturnUrl = (currentPath: string | null): string => {
  const safePath = getSafePath(currentPath, '/');
  return encodeURIComponent(safePath);
};
