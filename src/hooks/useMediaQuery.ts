import { useState, useEffect } from 'react'

/**
 * Hook for responsive design - detects if a media query matches
 * @param query CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Default to false during SSR
    if (typeof window === 'undefined') return

    // Create media query list
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Define callback for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Legacy support
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
}

/**
 * Predefined breakpoints matching Tailwind CSS defaults
 */
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  
  // Inverse (max-width) breakpoints
  smDown: '(max-width: 639px)',
  mdDown: '(max-width: 767px)',
  lgDown: '(max-width: 1023px)',
  xlDown: '(max-width: 1279px)',
  '2xlDown': '(max-width: 1535px)',
  
  // Dark mode
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  
  // Reduced motion
  reducedMotion: '(prefers-reduced-motion: reduce)',
  
  // Device types
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  touch: '(hover: none) and (pointer: coarse)',
  stylus: '(hover: none) and (pointer: fine)',
  pointer: '(hover: hover) and (pointer: fine)',
}
