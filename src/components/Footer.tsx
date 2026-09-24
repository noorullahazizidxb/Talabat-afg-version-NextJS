'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const FOOTER_LINKS = [
  { title: 'Company', links: [{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Blog', href: '/blog' }, { label: 'Press', href: '/press' }] },
  { title: 'Support',  links: [{ label: 'Help Center', href: '/help' }, { label: 'Safety', href: '/safety' }, { label: 'Guidelines', href: '/guidelines' }] },
  { title: 'Legal',    links: [{ label: 'Terms', href: '/terms' }, { label: 'Privacy', href: '/privacy' }, { label: 'Cookies', href: '/cookies' }] },
  { title: 'App',      links: [{ label: 'iOS', href: '/ios' }, { label: 'Android', href: '/android' }, { label: 'Huawei', href: '/huawei' }] },
]

const SOCIAL = [
  { icon: Facebook,  href: 'https://facebook.com',  label: 'Facebook' },
  { icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin,  href: 'https://linkedin.com',  label: 'LinkedIn' },
]

const CONTACT = [
  { icon: Mail,   content: 'support@talabat.com' },
  { icon: Phone,  content: '+93 (0) 70 000 0000' },
  { icon: MapPin, content: 'Kabul, Afghanistan' },
]

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border text-card-foreground">
      <div className="container mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }} className="space-y-5">
              <Link href="/" className="text-2xl font-extrabold tracking-tight text-foreground">
                talabat<span className="text-primary">.</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Your favourite food, groceries, flowers and more — delivered fast across Afghanistan.
              </p>
              <ul className="space-y-2">
                {CONTACT.map((c) => (
                  <li key={c.content} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <c.icon className="h-4 w-4 text-primary shrink-0" />
                    {c.content}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.92 }}
                    aria-label={label}
                    className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((section, i) => (
            <motion.div key={section.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}
                      className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            © 2025 talabat.com — built with <Heart className="h-3.5 w-3.5 text-destructive" fill="currentColor" /> for Afghanistan
          </p>
          <a href="https://note-app.devminds.net" className="text-primary hover:underline">
            note-app.devminds.net
          </a>
        </div>
      </div>
    </footer>
  )
}
