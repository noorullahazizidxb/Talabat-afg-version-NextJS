'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'
import BrandMark from './BrandMark'
import { cn } from '../utils/theme'
import { fadeUp, press, revealViewport, staggerContainer } from '../utils/motion'

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/corporate/about' },
      { label: 'Careers', href: '/corporate/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/corporate/newsroom' },
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
  { icon: Mail, content: 'support@talabat.com', href: 'mailto:support@talabat.com' },
  { icon: Phone, content: '+971 800 TALABAT (825 2228)', href: 'tel:+9718008252228' },
  { icon: MapPin, content: 'Dubai, United Arab Emirates' },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'

export default function Footer() {
  return (
    <footer
      className={cn(
        'border-t pt-14 pb-8 transition-colors duration-200',
        'bg-surface-light dark:bg-surface-dark',
        'border-gray-200 dark:border-gray-800'
      )}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerContainer(0.07)}
        className="container mx-auto px-4"
      >
        <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-6">
          <motion.div variants={fadeUp} className="col-span-2 space-y-5">
            <BrandMark />
            <p className="max-w-sm text-pretty text-gray-600 dark:text-gray-400">
              Your favorite food, groceries, flowers and more, delivered fast to your door.
            </p>

            <ul className="space-y-1">
              {contactInfo.map(({ icon: Icon, content, href }) => {
                const body = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                    <span className="break-words">{content}</span>
                  </>
                )
                return (
                  <li key={content}>
                    {href ? (
                      <a
                        href={href}
                        className={cn(
                          'inline-flex min-h-10 items-center gap-3 rounded-md text-gray-600 transition-colors hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-300',
                          focusRing
                        )}
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-10 items-center gap-3 text-gray-600 dark:text-gray-400">{body}</span>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  {...press}
                  whileHover={{ y: -2 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-full transition-colors duration-200',
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
                    'hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-500/15 dark:hover:text-orange-300',
                    focusRing
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map(section => (
            <motion.nav key={section.title} variants={fadeUp} aria-label={section.title}>
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
              <ul className="space-y-0.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        'inline-flex min-h-10 items-center rounded-md text-sm transition-colors duration-200',
                        'text-gray-600 hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-300',
                        focusRing
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400"
        >
          <p className="flex flex-wrap items-center justify-center gap-1">
            ©2025 talabat.com – Built with
            <Heart className="h-4 w-4 text-red-500" fill="currentColor" aria-label="love" />
            in the UAE
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
