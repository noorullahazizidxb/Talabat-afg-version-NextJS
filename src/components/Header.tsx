'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Search, Sun, Moon, Home, Coffee, ShoppingCart, Flower, Store } from 'lucide-react'
import BrandMark from './BrandMark'
import { useHydrated } from '../hooks/useHydrated'
import { useTheme, cn } from '../utils/theme'
import { dropdown, dropdownItem, press, spring } from '../utils/motion'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/order', label: 'Order Food', icon: Coffee },
  { href: '/grocery', label: 'Groceries', icon: ShoppingCart },
  { href: '/flowers', label: 'Flowers', icon: Flower },
  { href: '/catagory/mart', label: 'Talabat Mart', icon: Store },
]

const iconButton = cn(
  'grid h-10 w-10 place-items-center rounded-full transition-colors duration-200',
  'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
)

const isActive = (pathname: string | null, href: string) =>
  pathname !== null && (href === '/' ? pathname === '/' : pathname.startsWith(href))

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, toggleTheme } = useTheme()
  const hydrated = useHydrated()
  const isDark = hydrated && resolvedTheme === 'dark'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-200',
        'bg-background-light/90 backdrop-blur-md dark:bg-background-dark/90',
        'border-b border-gray-200 dark:border-gray-800'
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2.5">
        <BrandMark />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors duration-200',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                  active
                    ? 'text-orange-700 dark:text-orange-300'
                    : 'text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="header-active-pill"
                    transition={spring.layout}
                    className="absolute inset-0 -z-10 rounded-full bg-orange-100 dark:bg-orange-500/15"
                  />
                )}
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <motion.span {...press} className="inline-flex">
            <Link href="/restaurants" aria-label="Search restaurants" className={iconButton}>
              <Search className="h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.span>

          <motion.button
            {...press}
            type="button"
            onClick={toggleTheme}
            className={iconButton}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={spring.snappy}
                className="inline-flex"
              >
                {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            {...press}
            type="button"
            className={cn(iconButton, 'md:hidden')}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="header-mobile-nav"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="header-mobile-nav"
            aria-label="Main mobile"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdown}
            className="absolute inset-x-0 top-full border-b border-gray-200 bg-background-light shadow-lg md:hidden dark:border-gray-800 dark:bg-background-dark"
          >
            <ul className="container mx-auto space-y-1 px-4 py-3">
              {links.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href)
                return (
                  <motion.li key={href} variants={dropdownItem}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center gap-3 rounded-xl px-3 transition-colors duration-200',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                        active
                          ? 'bg-orange-100 font-semibold text-orange-800 dark:bg-orange-500/15 dark:text-orange-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span>{label}</span>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
