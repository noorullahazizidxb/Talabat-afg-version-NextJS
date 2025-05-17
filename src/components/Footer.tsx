'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { cn } from '../utils/theme'

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Safety Center', href: '/safety' },
      { label: 'Community Guidelines', href: '/guidelines' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
  {
    title: 'Install App',
    links: [
      { label: 'iOS App', href: '/ios' },
      { label: 'Android App', href: '/android' },
      { label: 'Huawei App', href: '/huawei' },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

const contactInfo = [
  { icon: Mail, content: 'support@talabat.com' },
  { icon: Phone, content: '+971 800 TALABAT (825 2228)' },
  { icon: MapPin, content: 'Dubai, United Arab Emirates' },
]

export default function Footer() {
  return (
    <footer className={cn(
      "pt-12 pb-8 transition-colors duration-200",
      "bg-surface-light dark:bg-surface-dark",
      "border-t border-gray-200 dark:border-gray-800"
    )}>
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Link href="/">
                <div className={cn(
                  "text-2xl font-bold flex items-center gap-2 transition-colors duration-200",
                  "text-accent-600 dark:text-accent-400"
                )}>
                  talabat
                </div>
              </Link>
              <p className={cn(
                "max-w-md transition-colors duration-200",
                "text-gray-600 dark:text-gray-400"
              )}>
                Your favorite food, groceries, flowers and more, delivered fast to your door.
              </p>
              
              {/* Contact info */}
              <div className="space-y-2 mt-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={cn(
                        "flex items-center gap-3 transition-colors duration-200",
                        "text-gray-600 dark:text-gray-400"
                      )}
                    >
                      <Icon className="h-4 w-4 text-accent-500" />
                      <span>{item.content}</span>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Social links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "p-2 rounded-full",
                        "bg-gray-100 dark:bg-gray-800",
                        "text-gray-700 dark:text-gray-300",
                        "hover:bg-accent-100 dark:hover:bg-accent-900",
                        "hover:text-accent-600 dark:hover:text-accent-400",
                        "transition-colors duration-200"
                      )}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>
          
          {/* Links columns */}
          {footerLinks.map((section, i) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className={cn(
                "font-semibold mb-4 transition-colors duration-200",
                "text-gray-900 dark:text-gray-100"
              )}>{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i * 0.1) + (j * 0.05), duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href={link.href}
                      className={cn(
                        "transition-colors duration-200",
                        "text-gray-600 dark:text-gray-400",
                        "hover:text-accent-600 dark:hover:text-accent-400"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Footer bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className={cn(
            "pt-8 mt-8 text-center text-sm transition-colors duration-200",
            "border-t border-gray-200 dark:border-gray-800",
            "text-gray-600 dark:text-gray-400"
          )}
        >
          <p className="flex items-center justify-center gap-1">
            ©2025 talabat.com – Built with <Heart className="h-4 w-4 text-red-500 animate-pulse" fill="currentColor" /> in the UAE
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
