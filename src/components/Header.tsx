'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, Sun, Moon, Home, Coffee, ShoppingCart, Flower, Store } from 'lucide-react'
import { useTheme } from '../utils/theme'
import { cn } from '../utils/theme'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/order', label: 'Order Food', icon: Coffee },
  { href: '/grocery', label: 'Groceries', icon: ShoppingCart },
  { href: '/flowers', label: 'Flowers', icon: Flower },
  { href: '/mart', label: 'Talabat Mart', icon: Store },
]

// Animation variants
const navItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
}

const mobileMenuVariants = {
  closed: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: { 
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05,
      staggerDirection: 1
    }
  }
}

const mobileNavItemVariants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        "sticky top-0 z-50 shadow-sm transition-colors duration-200",
        "bg-background-light dark:bg-background-dark",
        "border-b border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
            "text-2xl font-bold flex items-center gap-2 transition-colors duration-200",
            "text-accent-600 dark:text-accent-400"
          )}
          >
            <ShoppingBag className="h-6 w-6" />
            <span>talabat</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.div
                key={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                      "transition-colors duration-200"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "p-2 rounded-full transition-colors duration-200",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Search className="h-5 w-5" />
          </motion.button>
          
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-colors duration-200",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "md:hidden p-2 rounded-full transition-colors duration-200",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className={cn(
              "md:hidden overflow-hidden transition-colors duration-200",
              "border-t border-gray-200 dark:border-gray-800",
              "bg-background-light dark:bg-background-dark"
            )}
          >
            <div className="container mx-auto px-4 py-3 space-y-2">
              {links.map((link, i) => {
                const Icon = link.icon
                return (
                  <motion.div 
                    key={link.href}
                    variants={mobileNavItemVariants}
                    className="w-full"
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-md transition-colors duration-200",
                        "text-gray-700 dark:text-gray-300",
                        "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
