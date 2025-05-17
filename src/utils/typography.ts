import { cn } from './theme'

// Typography scale for consistent text styling
export const typography = {
  h1: (className?: string) => cn(
    'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    className
  ),
  h2: (className?: string) => cn(
    'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
    className
  ),
  h3: (className?: string) => cn(
    'scroll-m-20 text-2xl font-semibold tracking-tight',
    className
  ),
  h4: (className?: string) => cn(
    'scroll-m-20 text-xl font-semibold tracking-tight',
    className
  ),
  p: (className?: string) => cn(
    'leading-7 [&:not(:first-child)]:mt-6',
    className
  ),
  blockquote: (className?: string) => cn(
    'mt-6 border-l-2 border-primary-500 pl-6 italic',
    className
  ),
  list: (className?: string) => cn(
    'my-6 ml-6 list-disc [&>li]:mt-2',
    className
  ),
  inlineCode: (className?: string) => cn(
    'relative rounded bg-gray-100 dark:bg-gray-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    className
  ),
  lead: (className?: string) => cn(
    'text-xl text-gray-600 dark:text-gray-400',
    className
  ),
  large: (className?: string) => cn(
    'text-lg font-semibold',
    className
  ),
  small: (className?: string) => cn(
    'text-sm font-medium leading-none',
    className
  ),
  subtle: (className?: string) => cn(
    'text-sm text-gray-500 dark:text-gray-400',
    className
  ),
}
