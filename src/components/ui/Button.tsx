'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/theme'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = 
      typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        : false

    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      {
        'w-full': fullWidth,
        // Size variants
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
        // Color variants
        'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
        'bg-secondary-600 text-white hover:bg-secondary-700': variant === 'secondary',
        'bg-accent-500 text-white hover:bg-accent-600': variant === 'accent',
        'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'outline',
        'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
        'bg-transparent text-primary-600 dark:text-primary-400 hover:underline p-0 h-auto': variant === 'link',
      },
      className
    )

    // Handle animations based on reduced motion preference
    if (prefersReducedMotion) {
      return (
        <button
          className={baseStyles}
          ref={ref}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
      )
    }

    return (
      <motion.button
        className={baseStyles}
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
        whileTap={{ scale: variant === 'link' ? 0.98 : 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
