'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  SUPPORTED_LANGUAGES, 
  SupportedLanguage, 
  getTranslations, 
  Translation 
} from '@/utils/i18n/translations'

interface I18nContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
  t: (key: string, namespace?: string) => string
  dir: 'ltr' | 'rtl'
  translations: Translation
  formatDate: (date: Date | string | number) => string
  formatTime: (date: Date | string | number) => string
  formatNumber: (num: number) => string
  formatCurrency: (amount: number, currency?: string) => string
  availableLanguages: typeof SUPPORTED_LANGUAGES
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: React.ReactNode
  initialLanguage?: SupportedLanguage
}

export function I18nProvider({ children, initialLanguage = 'en' }: I18nProviderProps) {
  // Initialize with browser language if available, otherwise use initialLanguage
  const getBrowserLanguage = (): SupportedLanguage => {
    if (typeof window === 'undefined') return initialLanguage
    
    const browserLang = window.navigator.language.split('-')[0] as SupportedLanguage
    return browserLang in SUPPORTED_LANGUAGES ? browserLang : initialLanguage
  }
  
  // Get stored language from localStorage if available
  const getStoredLanguage = (): SupportedLanguage => {
    if (typeof window === 'undefined') return initialLanguage
    
    const storedLang = localStorage.getItem('talabat-language') as SupportedLanguage
    return storedLang in SUPPORTED_LANGUAGES ? storedLang : getBrowserLanguage()
  }
  
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage)
  const [translations, setTranslations] = useState<Translation>(getTranslations(initialLanguage))
  const [dir, setDir] = useState<'ltr' | 'rtl'>(
    SUPPORTED_LANGUAGES[initialLanguage].direction as 'ltr' | 'rtl'
  )
  
  // Initialize language on client side
  useEffect(() => {
    const storedLang = getStoredLanguage()
    if (storedLang !== language) {
      setLanguageState(storedLang)
    }
  }, [language])
  
  // Update translations and direction when language changes
  useEffect(() => {
    setTranslations(getTranslations(language))
    setDir(SUPPORTED_LANGUAGES[language].direction as 'ltr' | 'rtl')
    
    // Update document direction and lang attributes
    if (typeof document !== 'undefined') {
      document.documentElement.dir = SUPPORTED_LANGUAGES[language].direction
      document.documentElement.lang = language
    }
    
    // Store language preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('talabat-language', language)
    }
  }, [language])
  
  // Set language function
  const setLanguage = (lang: SupportedLanguage) => {
    if (lang in SUPPORTED_LANGUAGES) {
      setLanguageState(lang)
    }
  }
  
  // Translation function
  const t = (key: string, namespace = 'common'): string => {
    const parts = key.includes('.') ? key.split('.') : [namespace, key]
    
    if (parts.length !== 2) {
      console.warn(`Invalid translation key: ${key}`)
      return key
    }
    
    const [ns, k] = parts
    
    try {
      // @ts-ignore - We know this is safe because we're checking for the namespace
      const translated = translations[ns]?.[k]
      
      if (!translated) {
        console.warn(`Missing translation: ${ns}.${k}`)
        return k
      }
      
      return translated
    } catch (error) {
      console.error(`Translation error for key ${ns}.${k}:`, error)
      return k
    }
  }
  
  // Format date based on current language
  const formatDate = (date: Date | string | number): string => {
    const dateObj = new Date(date)
    
    try {
      return new Intl.DateTimeFormat(language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(dateObj)
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateObj.toLocaleDateString()
    }
  }
  
  // Format time based on current language
  const formatTime = (date: Date | string | number): string => {
    const dateObj = new Date(date)
    
    try {
      return new Intl.DateTimeFormat(language, {
        hour: 'numeric',
        minute: 'numeric'
      }).format(dateObj)
    } catch (error) {
      console.error('Error formatting time:', error)
      return dateObj.toLocaleTimeString()
    }
  }
  
  // Format number based on current language
  const formatNumber = (num: number): string => {
    try {
      return new Intl.NumberFormat(language).format(num)
    } catch (error) {
      console.error('Error formatting number:', error)
      return num.toString()
    }
  }
  
  // Format currency based on current language
  const formatCurrency = (amount: number, currency = 'AED'): string => {
    try {
      return new Intl.NumberFormat(language, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    } catch (error) {
      console.error('Error formatting currency:', error)
      return `${currency} ${amount.toFixed(2)}`
    }
  }
  
  const value = {
    language,
    setLanguage,
    t,
    dir,
    translations,
    formatDate,
    formatTime,
    formatNumber,
    formatCurrency,
    availableLanguages: SUPPORTED_LANGUAGES
  }
  
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

// Custom hook to use i18n context
export function useI18n() {
  const context = useContext(I18nContext)
  
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  
  return context
}
