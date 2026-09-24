'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Facebook, Twitter, Instagram, Linkedin,
  Mail, Phone, MapPin, Heart,
  ArrowUpRight,
} from 'lucide-react'

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
  { icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook' },
  { icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn' },
]

const contactInfo = [
  { icon: Mail,   content: 'support@talabat.com' },
  { icon: Phone,  content: '+93 (0) 70 000 0000' },
  { icon: MapPin, content: 'Kabul, Afghanistan' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <Link href="/" className="inline-block">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  talabat<span className="text-orange-500">.</span>
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                Your favourite food, groceries, flowers and more — delivered fast to your door across Afghanistan.
              </p>

              {/* Contact */}
              <ul className="space-y-2.5">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <Icon className="h-4 w-4 text-orange-400 shrink-0" />
                      {item.content}
                    </li>
                  )
                })}
              </ul>

              {/* Social */}
              <div className="flex gap-2 pt-1">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
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
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-slate-400 hover:text-orange-400 transition-colors duration-150"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © 2025 talabat.com — built with{' '}
            <Heart className="h-3.5 w-3.5 text-red-500" fill="currentColor" />
            {' '}for Afghanistan
          </p>
          <p>
            Hosted on{' '}
            <a href="https://note-app.devminds.net" className="text-orange-400 hover:underline">
              note-app.devminds.net
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

