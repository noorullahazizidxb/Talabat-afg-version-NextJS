'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Search, User } from 'lucide-react'
import { cn } from '@/utils/theme'
import { dropdown, dropdownItem, press } from '@/utils/motion'
import { brandBar, brandIconButton, brandLogoLink, brandMobilePanel, brandPill, brandSearchInput } from './styles'

const navItems = [
  { name: 'Back Home', href: '/' },
  { name: 'About', href: '/corporate/about' },
  { name: 'Our Menu', href: '/corporate/menu' },
  { name: 'Sustainability', href: '/corporate/sustainability' },
  { name: 'Newsroom', href: '/corporate/newsroom' },
  { name: 'Careers', href: '/corporate/careers' },
]

const activePill = 'bg-white text-orange-700 hover:bg-white dark:bg-orange-50 dark:text-orange-900 dark:hover:bg-orange-50'

export default function CorporateNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={brandBar}>
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2.5">
        <Link href="/" aria-label="talabat home" className={brandLogoLink}>
          <Image src="/images/logo.png" alt="Talabat" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <nav aria-label="Corporate" className="hidden items-center gap-2 lg:flex">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(brandPill, 'px-3.5 text-sm', active && activePill)}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <form role="search" onSubmit={e => e.preventDefault()} className="relative hidden w-full max-w-xs xl:flex">
          <label htmlFor="corporate-navbar-search" className="sr-only">
            Search
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white" aria-hidden="true" />
          <input id="corporate-navbar-search" type="search" placeholder="Search..." className={brandSearchInput} />
        </form>

        <div className="flex items-center gap-2">
          <motion.button {...press} type="button" aria-label="Search" className={cn(brandIconButton, 'xl:hidden')}>
            <Search className="h-5 w-5" aria-hidden="true" />
          </motion.button>

          <motion.button {...press} type="button" aria-label="Account" className={brandIconButton}>
            <User className="h-5 w-5" aria-hidden="true" />
          </motion.button>

          <motion.button
            {...press}
            type="button"
            className={cn(brandIconButton, 'lg:hidden')}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="corporate-navbar-mobile"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="corporate-navbar-mobile"
            aria-label="Corporate mobile"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdown}
            className={cn(brandMobilePanel, 'lg:hidden')}
          >
            <ul className="container mx-auto grid gap-2 px-4 py-3 sm:grid-cols-2">
              {navItems.map(item => {
                const active = pathname === item.href
                return (
                  <motion.li key={item.href} variants={dropdownItem}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(brandPill, 'h-11 w-full', active && activePill)}
                    >
                      {item.name}
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
