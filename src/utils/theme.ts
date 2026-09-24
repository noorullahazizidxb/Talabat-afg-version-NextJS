/**
 * @deprecated Import `cn` from `@/lib/utils` and `useTheme` from `next-themes`.
 * This shim keeps backwards compatibility for pages that haven't migrated yet.
 */
export { cn } from '@/lib/utils'
export type { ClassValue } from 'clsx'
export type Theme = 'light' | 'dark' | 'system'

// Re-export next-themes hook under the old name
export { useTheme } from 'next-themes'
