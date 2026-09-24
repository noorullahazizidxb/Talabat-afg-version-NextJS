'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, User, ChevronDown, Bell, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Grocery',     href: '/grocery' },
  { label: 'Flowers',     href: '/flowers' },
] as const

export default function MainNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 130, damping: 20 }}
      className={cn(
        'sticky top-0 z-50 text-white transition-shadow duration-200',
        'bg-gradient-to-r from-orange-600 to-orange-500',
        scrolled && 'shadow-xl shadow-orange-900/20'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center gap-3">
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt="Talabat" width={108} height={36} className="h-9 w-auto" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 ml-2">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors">
              {l.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors">
                Business <ChevronDown className="h-3.5 w-3.5 opacity-75" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem onClick={() => router.push('/corporate')}>Corporate</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/partner')}>Become a partner</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/corporate/newsroom')}>Newsroom</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex-1" />

        <div className="hidden md:block w-56 lg:w-72">
          <Input type="search" placeholder="Search restaurants..."
            startIcon={<Search className="h-4 w-4 text-white/70" />}
            className="bg-white/20 border-white/25 text-white placeholder:text-white/60 focus-visible:ring-white/50 focus-visible:bg-white/30 rounded-full h-9" />
        </div>

        <div className="flex items-center gap-0.5">
          <ThemeToggle className="text-white hover:bg-white/15 hover:text-white" />
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/15 hover:text-white" aria-label="Notifications"><Bell className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/15 hover:text-white" aria-label="Cart"><ShoppingCart className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/15 hover:text-white" aria-label="Account"><User className="h-5 w-5" /></Button>
          <Link href="/partner" className="hidden sm:block ml-1">
            <Button size="sm" variant="secondary" className="rounded-full font-semibold text-orange-600">Partner</Button>
          </Link>
          <Button variant="ghost" size="icon"
            className="md:hidden text-white hover:bg-white/15 hover:text-white ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mob" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/20 bg-orange-600/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-3 space-y-0.5">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
                <input type="search" placeholder="Search restaurants..."
                  className="w-full h-10 pl-9 pr-4 rounded-full text-sm bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none" />
              </div>
              {[...NAV_LINKS, { label: 'Corporate', href: '/corporate' }, { label: 'Partner', href: '/partner' }].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/15 transition-colors font-medium text-sm">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
