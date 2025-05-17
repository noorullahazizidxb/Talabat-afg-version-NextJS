'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'

const navItems = [
  { name: 'Restaurants', href: '/restaurants' },
  { name: 'Groceries', href: '/grocery' },
  { name: 'Flowers', href: '/category/flowers' },
  { name: 'Order', href: '/order' },
]

export default function UserNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-orange-500 text-white"
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
              className="text-white hover:text-orange-100 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <Search className="h-5 w-5" />
          </motion.button>
          
          {/* Cart button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </motion.button>
          
          {/* User button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <User className="h-5 w-5" />
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-full hover:bg-orange-600 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden border-t border-orange-400 bg-orange-500">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="block w-full text-left py-2 px-3 text-white hover:bg-orange-600 rounded-md transition-colors"
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
