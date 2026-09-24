'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, Sun, Moon, Home, Coffee, ShoppingCart, Flower, Store } from 'lucide-react'
import { useTheme } from '../utils/theme'
import { cn } from '../utils/theme'

const links = [
  { href: '/',        label: 'Home',        icon: Home },
  { href: '/order',   label: 'Order Food',  icon: Coffee },
  { href: '/grocery', label: 'Groceries',   icon: ShoppingCart },
  { href: '/flowers', label: 'Flowers',     icon: Flower },
  { href: '/mart',    label: 'Mart',        icon: Store },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shadow-sm"
    >
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-1.5 font-extrabold text-xl text-orange-500">
          <ShoppingBag className="h-5 w-5" />
          talabat
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 ml-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Search className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            <div className="container mx-auto px-4 py-2 space-y-0.5">
              {links.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <Icon className="h-4 w-4 text-orange-500" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

