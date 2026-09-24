'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ShoppingBag, Home, Coffee, ShoppingCart, Flower, Store } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Separator } from '@/components/ui/separator'

const LINKS = [
  { href: '/',        label: 'Home',       icon: Home },
  { href: '/order',   label: 'Order Food', icon: Coffee },
  { href: '/grocery', label: 'Groceries',  icon: ShoppingCart },
  { href: '/flowers', label: 'Flowers',    icon: Flower },
  { href: '/mart',    label: 'Mart',       icon: Store },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1.5 font-extrabold text-xl text-primary shrink-0">
          <ShoppingBag className="h-5 w-5" />
          talabat
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 ml-2">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <Icon className="h-3.5 w-3.5" /> {label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
            className="md:hidden overflow-hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-2 space-y-0.5">
              {LINKS.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <Icon className="h-4 w-4 text-primary" /> {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
