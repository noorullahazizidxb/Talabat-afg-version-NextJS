'use client'

import React, { useEffect } from 'react'
import { useI18n } from '@/utils/i18n/i18nContext'

interface RTLWrapperProps {
  children: React.ReactNode
  className?: string
}

/**
 * A wrapper component that applies RTL styling when the current language is RTL.
 * This component also handles dynamic switching between LTR and RTL layouts.
 */
export function RTLWrapper({ children, className = '' }: RTLWrapperProps) {
  const { dir } = useI18n()
  
  // Update document direction when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir
      
      // Add or remove RTL-specific CSS classes to the body
      if (dir === 'rtl') {
        document.body.classList.add('rtl')
      } else {
        document.body.classList.remove('rtl')
      }
    }
    
    return () => {
      // Clean up when component unmounts
      if (typeof document !== 'undefined') {
        document.body.classList.remove('rtl')
      }
    }
  }, [dir])
  
  return (
    <div dir={dir} className={`${dir === 'rtl' ? 'rtl' : 'ltr'} ${className}`}>
      {children}
    </div>
  )
}
