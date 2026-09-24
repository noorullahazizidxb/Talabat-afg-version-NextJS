'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, User, ChevronDown, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme, cn } from '@/utils/theme'

const navLinks = [
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Grocery', href: '/grocery' },
  { label: 'Flowers', href: '/flowers' },
]

export default function MainNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'shadow-lg' : 'shadow-sm',
        isDark
          ? 'bg-gradient-to-r from-orange-950 to-orange-900'
          : 'bg-gradient-to-r from-orange-600 to-orange-500'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Image
              src="/images/logo.png"
              alt="Talabat"
              width={110}
              height={36}
              className="h-9 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => router.push('/corporate')}
            className="px-3 py-1.5 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-all duration-150 flex items-center gap-1"
          >
            Business <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search bar (desktop) */}
        <div className="hidden md:flex items-center relative w-56 lg:w-72 xl:w-80">
          <Search className="absolute left-3 h-4 w-4 text-white/70 pointer-events-none" />
          <input
            type="search"
            placeholder="Search restaurants…"
            className="w-full h-9 pl-9 pr-4 rounded-full text-sm bg-white/20 text-white placeholder-white/60 border border-white/25 focus:outline-none focus:bg-white/30 focus:border-white/60 transition-all duration-200"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full text-white/90 hover:text-white hover:bg-white/15 transition-all"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </motion.button>

          <Link href="/partner">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-orange-600 hover:bg-orange-50 transition-colors ml-1 cursor-pointer"
            >
              Become a partner
            </motion.span>
          </Link>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-full text-white hover:bg-white/15 transition-all ml-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
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
            className={cn(
              'md:hidden overflow-hidden border-t',
              isDark ? 'border-orange-800 bg-orange-950' : 'border-orange-500 bg-orange-600'
            )}
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              {/* Search (mobile) */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                <input
                  type="search"
                  placeholder="Search restaurants…"
                  className="w-full h-10 pl-9 pr-4 rounded-full text-sm bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none"
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/15 transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { router.push('/corporate'); setOpen(false) }}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/15 transition-all font-medium"
              >
                Business
              </button>
              <button
                onClick={() => { router.push('/partner'); setOpen(false) }}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/15 transition-all font-medium"
              >
                Become a partner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

