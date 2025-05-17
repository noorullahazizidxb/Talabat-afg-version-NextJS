'use client'

import { cn } from '../../utils/theme'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullScreen?: boolean
  text?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  className, 
  fullScreen = false,
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  }

  const spinner = (
    <div className={cn('flex flex-col items-center justify-center', fullScreen && 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50')}>
      <div 
        className={cn(
          'rounded-full border-transparent border-t-primary-600 dark:border-t-primary-400 animate-spin',
          sizeClasses[size],
          className
        )} 
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  )

  return spinner
}
