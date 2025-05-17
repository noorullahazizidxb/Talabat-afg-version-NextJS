import { useCallback } from 'react'
import { useI18n } from '@/utils/i18n/i18nContext'
import { NAMESPACES, TranslationKeys } from '@/utils/i18n/translations'

/**
 * A hook that provides translation functions for a specific namespace
 * @param namespace The translation namespace to use
 * @returns Translation functions and utilities
 */
export function useTranslation<N extends keyof TranslationKeys>(namespace: N = 'common' as N) {
  const i18n = useI18n()
  
  // Type-safe translation function for the specified namespace
  const t = useCallback(
    <K extends keyof TranslationKeys[N]>(
      key: K,
      params?: Record<string, string | number>
    ): string => {
      // Get the translation from the i18n context
      const translation = i18n.t(`${namespace}.${String(key)}`)
      
      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce(
          (result, [param, value]) => result.replace(`{{${param}}}`, String(value)),
          translation
        )
      }
      
      return translation
    },
    [i18n, namespace]
  )
  
  // Translate with a different namespace
  const tns = useCallback(
    <NK extends keyof TranslationKeys, K extends keyof TranslationKeys[NK]>(
      ns: NK,
      key: K,
      params?: Record<string, string | number>
    ): string => {
      // Get the translation from the i18n context
      const translation = i18n.t(`${String(ns)}.${String(key)}`)
      
      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce(
          (result, [param, value]) => result.replace(`{{${param}}}`, String(value)),
          translation
        )
      }
      
      return translation
    },
    [i18n]
  )
  
  // Extract only the properties we need from i18n, excluding 't'
  const { 
    language, 
    setLanguage, 
    dir, 
    translations, 
    formatDate, 
    formatTime, 
    formatNumber, 
    formatCurrency, 
    availableLanguages 
  } = i18n
  
  return {
    t,
    tns,
    language,
    setLanguage,
    dir,
    translations,
    formatDate,
    formatTime,
    formatNumber,
    formatCurrency,
    availableLanguages,
    ns: namespace
  }
}
