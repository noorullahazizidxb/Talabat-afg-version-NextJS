'use client'

import { useEffect, useState } from 'react'
import { Toaster, toast as hotToast } from 'react-hot-toast'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/theme'

// Toast container that will be used by the app
export function ToastContainer() {
  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          margin: 0,
          width: 'auto',
          maxWidth: '100%',
        },
      }}
    >
      {(t) => {
        const Icon = 
          t.type === 'success' ? CheckCircle :
          t.type === 'error' ? AlertCircle :
          Info

        const variants = prefersReducedMotion
          ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
            }
          : {
              initial: { opacity: 0, x: 50, scale: 0.9 },
              animate: { opacity: 1, x: 0, scale: 1 },
              exit: { opacity: 0, x: 50, scale: 0.9 },
            }

        return (
          <AnimatePresence>
            <motion.div
              key={t.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className={cn(
                'flex items-start p-4 rounded-lg shadow-md mb-2 max-w-md',
                'border border-gray-100 dark:border-gray-800',
                {
                  'bg-success-50 dark:bg-success-900/20 text-success-900 dark:text-success-100': t.type === 'success',
                  'bg-error-50 dark:bg-error-900/20 text-error-900 dark:text-error-100': t.type === 'error',
                  'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100': t.type === 'loading' || t.type === 'blank',
                }
              )}
            >
              <div className="flex-shrink-0 mr-3">
                <Icon 
                  className={cn(
                    'h-5 w-5',
                    {
                      'text-success-500 dark:text-success-400': t.type === 'success',
                      'text-error-500 dark:text-error-400': t.type === 'error',
                      'text-blue-500 dark:text-blue-400': t.type === 'loading' || t.type === 'blank',
                    }
                  )} 
                />
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-sm font-medium">{t.message as string}</p>
              </div>
              <button 
                onClick={() => hotToast.dismiss(t.id)} 
                className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-500"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        )
      }}
    </Toaster>
  )
}

// Toast service for the app
export const toast = {
  success: (message: string) => hotToast.success(message),
  error: (message: string) => hotToast.error(message),
  info: (message: string) => hotToast(message, { icon: <Info className="h-5 w-5 text-blue-500" /> }),
  loading: (message: string) => hotToast.loading(message),
  dismiss: () => hotToast.dismiss(),
}
