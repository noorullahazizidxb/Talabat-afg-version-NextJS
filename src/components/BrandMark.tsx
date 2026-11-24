import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/utils/theme'

interface BrandMarkProps {
  className?: string
}

/** Wordmark logo: blue in light mode, orange in dark mode. */
export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label="talabat home"
      className={cn(
        'group inline-flex min-h-10 items-center gap-2 rounded-full text-2xl font-extrabold tracking-tight',
        'text-blue-600 dark:text-orange-400',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:focus-visible:outline-orange-400',
        className
      )}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white transition-transform duration-200 group-hover:-rotate-6 motion-reduce:transition-none dark:bg-orange-500 dark:text-gray-950">
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>talabat</span>
    </Link>
  )
}
