'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useI18n } from '@/utils/i18n/i18nContext'
import { SupportedLanguage } from '@/utils/i18n/translations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/theme'

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'menu' | 'buttons'
  className?: string
  buttonClassName?: string
  menuClassName?: string
  iconClassName?: string
  showFlags?: boolean
  showNativeNames?: boolean
  onLanguageChange?: (lang: SupportedLanguage) => void
}

export function LanguageSwitcher({
  variant = 'dropdown',
  className,
  buttonClassName,
  menuClassName,
  iconClassName,
  showFlags = true,
  showNativeNames = true,
  onLanguageChange
}: LanguageSwitcherProps) {
  const { language, setLanguage, t, availableLanguages } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang)
    setIsOpen(false)
    
    if (onLanguageChange) {
      onLanguageChange(lang)
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Get flag emoji for a language
  const getFlag = (lang: SupportedLanguage): string => {
    const flags: Record<SupportedLanguage, string> = {
      en: '🇺🇸',
      ar: '🇦🇪',
      hi: '🇮🇳',
      ur: '🇵🇰'
    }
    return flags[lang] || '🌐'
  }

  // Animation variants
  const menuVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 }
      }

  // Render dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <button
          type="button"
          onClick={toggleMenu}
          className={cn(
            'flex items-center space-x-2 px-3 py-2 rounded-md',
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            buttonClassName
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {showFlags && (
            <span className="text-lg" aria-hidden="true">
              {getFlag(language)}
            </span>
          )}
          <span className="font-medium">
            {showNativeNames
              ? availableLanguages[language].nativeName
              : availableLanguages[language].name}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              isOpen && 'transform rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop for closing the menu when clicking outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                transition={{ duration: 0.2 }}
                className={cn(
                  'absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20',
                  'bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5',
                  menuClassName
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="language-menu"
              >
                <div className="py-1" role="none">
                  {Object.entries(availableLanguages).map(([code, langInfo]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code as SupportedLanguage)}
                      className={cn(
                        'flex items-center w-full px-4 py-2 text-sm',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        code === language
                          ? 'text-primary-600 dark:text-primary-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                      role="menuitem"
                    >
                      {showFlags && (
                        <span className="text-lg mr-2" aria-hidden="true">
                          {getFlag(code as SupportedLanguage)}
                        </span>
                      )}
                      <span className="flex-1 text-left">
                        {showNativeNames ? langInfo.nativeName : langInfo.name}
                      </span>
                      {code === language && (
                        <Check className="h-4 w-4 ml-2" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Render menu variant (horizontal list)
  if (variant === 'menu') {
    return (
      <div className={cn('flex items-center space-x-4', className)}>
        <Globe
          className={cn('h-5 w-5 text-gray-500 dark:text-gray-400', iconClassName)}
          aria-hidden="true"
        />
        <div className="flex items-center space-x-2">
          {Object.entries(availableLanguages).map(([code, langInfo]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as SupportedLanguage)}
              className={cn(
                'px-2 py-1 text-sm rounded',
                'focus:outline-none focus:ring-2 focus:ring-primary-500',
                code === language
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-current={code === language ? 'true' : 'false'}
            >
              {showFlags && (
                <span className="mr-1" aria-hidden="true">
                  {getFlag(code as SupportedLanguage)}
                </span>
              )}
              {showNativeNames ? langInfo.nativeName : langInfo.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render buttons variant (just icons or flags)
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {Object.entries(availableLanguages).map(([code, langInfo]) => (
        <button
          key={code}
          onClick={() => handleLanguageChange(code as SupportedLanguage)}
          className={cn(
            'p-2 rounded-full',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            code === language
              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
          aria-label={`Switch to ${langInfo.name}`}
          aria-current={code === language ? 'true' : 'false'}
        >
          {showFlags ? (
            <span className="text-lg" aria-hidden="true">
              {getFlag(code as SupportedLanguage)}
            </span>
          ) : (
            <span className="text-sm font-medium uppercase">
              {code}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
