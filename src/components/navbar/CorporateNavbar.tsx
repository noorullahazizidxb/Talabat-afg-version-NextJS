'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X, Search, User, Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme, cn } from '@/utils/theme'

const navItems = [
{ name: ‘Home’, href: ‘/’ },
  { name: 'About', href: '/corporate/about' },
  { name: 'Our Menu', href: '/corporate/menu' },
  { name: 'Sustainability', href: '/corporate/sustainability' },
  { name: 'Newsroom', href: '/corporate/newsroom' },
  { name: 'Careers', href: '/corporate/careers' },

]

export default function CorporateNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        "sticky top-0 z-50 text-white transition-colors duration-200 shadow-lg border-1 border-white border-solid border-outset",
        isDark ? "bg-orange-900" : "bg-orange-500"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Image 
              src="/images/logo.png" 
              alt="Talabat" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </motion.div>
        </Link>

        {/* Nav Items - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "transition-colors px-4 py-1.5 rounded-[30px] border border-white",
                isDark 
                  ? "text-white hover:text-orange-200 hover:bg-orange-800" 
                  : "text-white hover:text-orange-100 hover:bg-orange-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Search bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search..." 
              className={cn(
                "w-full py-2 pl-10 pr-4 rounded-[30px] border border-white focus:outline-none transition-colors",
                isDark 
                  ? "bg-orange-800 text-white placeholder-orange-200" 
                  : "bg-orange-400 text-white placeholder-orange-100"
              )}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle removed */}
          {/* Search button for mobile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "p-2 rounded-[30px] transition-colors border border-white md:hidden",
              isDark 
                ? "hover:bg-orange-800" 
                : "hover:bg-orange-600"
            )}
          >
            <Search className="h-5 w-5" />
          </motion.button>
          
          {/* User button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "p-2 rounded-[30px] transition-colors border border-white",
              isDark 
                ? "hover:bg-orange-800" 
                : "hover:bg-orange-600"
            )}
          >
            <User className="h-5 w-5" />
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "md:hidden p-2 rounded-[30px] transition-colors border border-white",
              isDark 
                ? "hover:bg-orange-800" 
                : "hover:bg-orange-600"
            )}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className={cn(
          "md:hidden border-t transition-colors duration-200",
          isDark 
            ? "border-orange-800 bg-orange-900" 
            : "border-orange-400 bg-orange-500"
        )}>
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "block w-full text-left py-2 px-3 text-white rounded-[30px] transition-colors border border-white",
                  isDark 
                    ? "hover:bg-orange-800" 
                    : "hover:bg-orange-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
}
