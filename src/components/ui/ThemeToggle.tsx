'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme, cn } from '../../utils/theme'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  
  const isDark = resolvedTheme === 'dark'
  
  const sizes = {
    sm: {
      button: 'h-8 w-8',
      icon: 'h-4 w-4',
    },
    md: {
      button: 'h-10 w-10',
      icon: 'h-5 w-5',
    },
    lg: {
      button: 'h-12 w-12',
      icon: 'h-6 w-6',
    },
  }

  // Animation variants
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { rotate: -30, opacity: 0 },
        animate: { rotate: 0, opacity: 1 },
        exit: { rotate: 30, opacity: 0 },
      }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200',
        isDark 
          ? 'text-gray-300 hover:bg-gray-800 focus:ring-primary-500 focus:ring-offset-gray-900' 
          : 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500',
        sizes[size].button,
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative h-full w-full">
        {isDark ? (
          <motion.div
            key="dark"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className={sizes[size].icon} />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className={sizes[size].icon} />
          </motion.div>
        )}
      </div>
    </button>
  )
}
