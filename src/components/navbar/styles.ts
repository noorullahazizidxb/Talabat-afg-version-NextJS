import { cn } from '@/utils/theme'

/** Shared styles for the orange brand navbars (MainNavbar, CorporateNavbar). */
const onBrandFocus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
const onBrandHover = 'hover:bg-orange-600 dark:hover:bg-orange-800'

export const brandBar =
  'sticky top-0 z-50 border-b border-white/15 bg-orange-500 text-white shadow-lg shadow-orange-900/10 transition-colors duration-200 dark:bg-orange-900'

export const brandPill = cn(
  'inline-flex h-10 items-center rounded-full border border-white/80 px-4 text-white transition-colors duration-200',
  onBrandHover,
  onBrandFocus
)

export const brandIconButton = cn(
  'grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/80 transition-colors duration-200',
  onBrandHover,
  onBrandFocus
)

export const brandSearchInput = cn(
  'h-10 w-full rounded-full border border-white/80 pl-10 pr-4 text-white transition-colors',
  'bg-orange-400/80 placeholder-orange-50 dark:bg-orange-800 dark:placeholder-orange-200',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
)

export const brandMobilePanel =
  'absolute inset-x-0 top-full border-t border-orange-400 bg-orange-500 shadow-lg dark:border-orange-800 dark:bg-orange-900'

export const brandLogoLink = cn('shrink-0 rounded-lg', onBrandFocus)
