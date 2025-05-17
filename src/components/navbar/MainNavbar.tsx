'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingBag, Search, User, Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme, cn } from '@/utils/theme'

export default function MainNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const handleCorporateClick = () => {
    router.push('/corporate')
  }

  const handlePartnerClick = () => {
    router.push('/partner')
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        "sticky top-0 z-50 text-white transition-colors duration-200 shadow-lg border-1 border-dark border-solid border-inset",
        isDark ? "bg-orange-900" : "bg-orange-500"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side nav items */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={handleCorporateClick}
            className={cn(
              "transition-colors px-4 py-1.5 rounded-[30px] border border-white",
              isDark 
                ? "text-white hover:text-orange-200 hover:bg-orange-800" 
                : "text-white hover:text-orange-100 hover:bg-orange-600"
            )}
          >
            Corporate
          </button>
          <button 
            onClick={handlePartnerClick}
            className={cn(
              "transition-colors px-4 py-1.5 rounded-[30px] border border-white",
              isDark 
                ? "text-white hover:text-orange-200 hover:bg-orange-800" 
                : "text-white hover:text-orange-100 hover:bg-orange-600"
            )}
          >
            Become a partner
          </button>
        </div>

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

        {/* Search bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search for restaurants or food..." 
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
          {/* Theme toggle button removed */}
          
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
            <button 
              onClick={handleCorporateClick}
              className={cn(
                "block w-full text-left py-2 px-3 text-white rounded-[30px] transition-colors border border-white",
                isDark 
                  ? "hover:bg-orange-800" 
                  : "hover:bg-orange-600"
              )}
            >
              Corporate
            </button>
            <button 
              onClick={handlePartnerClick}
              className={cn(
                "block w-full text-left py-2 px-3 text-white rounded-[30px] transition-colors border border-white",
                isDark 
                  ? "hover:bg-orange-800" 
                  : "hover:bg-orange-600"
              )}
            >
              Become a partner
            </button>
          </div>
        </div>
      )}
    </motion.header>
  )
}
