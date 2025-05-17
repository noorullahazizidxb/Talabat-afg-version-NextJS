'use client'

import { forwardRef } from 'react'
import { cn } from '../../utils/theme'

interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId: string
}

/**
 * SkipLink component for accessibility - allows keyboard users to skip navigation
 * and go directly to main content
 */
const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ className, targetId, children = 'Skip to content', ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={`#${targetId}`}
        className={cn(
          'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white dark:focus:bg-gray-800',
          'focus:text-primary-600 dark:focus:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500',
          'focus:top-0 focus:left-0',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)

SkipLink.displayName = 'SkipLink'

export { SkipLink }
