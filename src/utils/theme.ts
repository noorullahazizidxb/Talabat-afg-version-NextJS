'use client'

import { useTheme as useNextTheme } from 'next-themes'

/**
 * @deprecated Import `cn` from `@/lib/utils` and `useTheme` from `next-themes`.
 * This shim keeps backwards compatibility for pages that haven't migrated yet.
 */
export { cn } from '@/lib/utils'
export type { ClassValue } from 'clsx'
export type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const theme = useNextTheme()

  return {
    ...theme,
    toggleTheme: () => theme.setTheme(theme.resolvedTheme === 'dark' ? 'light' : 'dark'),
  }
}
