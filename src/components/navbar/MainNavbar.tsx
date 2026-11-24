'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/theme'
import { dropdown, dropdownItem, press } from '@/utils/motion'
import { brandBar, brandIconButton, brandLogoLink, brandMobilePanel, brandPill, brandSearchInput } from './styles'

export default function MainNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const navActions = [
    { label: 'Corporate', onSelect: () => router.push('/corporate') },
    { label: 'Become a partner', onSelect: () => router.push('/partner') },
  ]

  return (
    <header className={brandBar}>
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2.5">
        <nav aria-label="Company" className="hidden items-center gap-3 md:flex">
          {navActions.map(action => (
            <motion.button key={action.label} {...press} type="button" onClick={action.onSelect} className={brandPill}>
              {action.label}
            </motion.button>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="talabat home"
          className={brandLogoLink}
        >
          <Image src="/images/logo.png" alt="Talabat" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <form role="search" onSubmit={e => e.preventDefault()} className="relative mx-4 hidden w-full max-w-md md:flex">
          <label htmlFor="main-navbar-search" className="sr-only">
            Search for restaurants or food
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white" aria-hidden="true" />
          <input
            id="main-navbar-search"
            type="search"
            placeholder="Search for restaurants or food..."
            className={brandSearchInput}
          />
        </form>

        <div className="flex items-center gap-2">
          <motion.button {...press} type="button" aria-label="Account" className={brandIconButton}>
            <User className="h-5 w-5" aria-hidden="true" />
          </motion.button>

          <motion.button
            {...press}
            type="button"
            className={cn(brandIconButton, 'md:hidden')}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="main-navbar-mobile"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="main-navbar-mobile"
            aria-label="Company mobile"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdown}
            className={cn(brandMobilePanel, 'md:hidden')}
          >
            <ul className="container mx-auto space-y-2 px-4 py-3">
              {navActions.map(action => (
                <motion.li key={action.label} variants={dropdownItem}>
                  <button
                    type="button"
                    onClick={action.onSelect}
                    className={cn(brandPill, 'h-11 w-full justify-start px-4')}
                  >
                    {action.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
