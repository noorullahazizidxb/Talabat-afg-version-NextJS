import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  ArrowRight, ShoppingBag, ShoppingCart, Flower,
  Pill, Heart, Clock, Shield, Truck, Star,
} from 'lucide-react'
import '@/styles/globals.css'
import MainNavbar from '@/components/navbar/MainNavbar'
import LocationSearch from '@/components/LocationSearch'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Lazy-load map to avoid SSR issues
const DeliveryMap = dynamic(
  () => import('@/components/map/DeliveryMap').then((m) => m.DeliveryMap),
  { ssr: false, loading: () => <div className="h-72 rounded-xl bg-muted animate-pulse" /> }
)

// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'food',      title: 'Order food',      desc: 'Find deals, free delivery from favourite restaurants', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop', icon: <ShoppingBag className="h-5 w-5" />, href: '/category/food',      btn: 'Order now',  from: 'from-orange-500', to: 'to-red-500' },
  { id: 'groceries', title: 'Order groceries', desc: 'Skip the queue — get groceries delivered to you',      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop', icon: <ShoppingCart className="h-5 w-5" />, href: '/grocery',           btn: 'Shop now',   from: 'from-emerald-500', to: 'to-teal-500' },
  { id: 'flowers',   title: 'Order flowers',   desc: 'Say it with flowers — fresh delivery to your loved ones',image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=500&auto=format&fit=crop', icon: <Flower className="h-5 w-5" />,      href: '/category/flowers',  btn: 'Shop now',   from: 'from-pink-500', to: 'to-rose-500' },
  { id: 'medicine',  title: 'Order medicine',  desc: 'Get medicines delivered safely to your door',           image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop', icon: <Pill className="h-5 w-5" />,        href: '/category/medicine', btn: 'Shop now',   from: 'from-blue-500', to: 'to-cyan-500' },
  { id: 'donations', title: 'Donations',       desc: 'Help those in need — together we make a difference',    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=500&auto=format&fit=crop', icon: <Heart className="h-5 w-5" />,       href: '/donations',         btn: 'Donate now', from: 'from-violet-500', to: 'to-purple-500' },
  { id: 'mart',      title: 'talabat mart',    desc: 'Get anything you need, delivered in 20 minutes',        image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=500&auto=format&fit=crop', icon: <ShoppingBag className="h-5 w-5" />, href: '/talabat-mart',      btn: 'Shop now',   from: 'from-amber-500', to: 'to-orange-500' },
]

const FEATURES = [
  { icon: Clock,   title: 'Fast delivery',  desc: '30 min or less on most orders' },
  { icon: Shield,  title: 'Safe & secure',  desc: 'Your data and payments protected' },
  { icon: Truck,   title: 'Free delivery',  desc: 'On your first 3 orders' },
  { icon: Star,    title: 'Top rated',      desc: 'Over 50,000 five-star reviews' },
]

const SAMPLE_MARKERS = [
  { lat: 34.528, lng: 69.175, label: 'Vegan Burger',  type: 'restaurant' as const },
  { lat: 34.524, lng: 69.185, label: 'Japanese Talk', type: 'restaurant' as const },
  { lat: 34.521, lng: 69.170, label: 'Spicy House',   type: 'restaurant' as const },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const item    = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16 } } }

// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNavbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 dark:from-orange-950 dark:via-orange-900 dark:to-orange-800">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} className="mb-6">
              <Image src="/images/logo.png" alt="Talabat" width={180} height={56} className="mx-auto drop-shadow-xl" priority />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Everything you need,<br />
              <span className="text-orange-100">delivered fast</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
              className="text-lg text-orange-100/90 mb-8 max-w-md">
              Food, groceries, flowers & more — to your door in minutes.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="w-full max-w-lg">
              <LocationSearch />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44 }} className="mt-5 flex gap-3">
              <Button variant="outline" size="pill" className="border-white/60 text-white hover:bg-white/15 hover:text-white"
                onClick={() => setAuthOpen(true)}>
                Sign in
              </Button>
              <Button size="pill" variant="secondary" className="text-orange-600 font-semibold"
                onClick={() => setAuthOpen(true)}>
                Create account
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features strip ──────────────────────────────────────── */}
      <section className="bg-secondary border-y border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 p-3 rounded-xl">
                <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground leading-tight">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category cards ──────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">What can we get you?</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Order from any category</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">Choose a category and we'll find the best options near you.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.id} variants={item}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div className={cn('absolute inset-0 z-10 opacity-55 bg-gradient-to-br', cat.from, cat.to)} />
                  <Image src={cat.image} alt={cat.title} width={500} height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 z-20 p-2 rounded-xl bg-white/25 backdrop-blur-sm text-white">
                    {cat.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-card-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cat.desc}</p>
                  <Link href={cat.href}>
                    <Button size="sm" size="pill"
                      className={cn('bg-gradient-to-r text-white hover:opacity-90 hover:shadow-md border-0', cat.from, cat.to)}>
                      {cat.btn}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Delivery map ────────────────────────────────────────── */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge variant="secondary" className="mb-3">Coverage</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">See restaurants near you</h2>
            <p className="mt-3 text-muted-foreground">Explore our delivery coverage across Kabul and beyond.</p>
          </motion.div>
          <DeliveryMap
            lat={34.5254}
            lng={69.1783}
            zoom={13}
            markers={SAMPLE_MARKERS}
            height="420px"
            className="shadow-xl"
          />
        </div>
      </section>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <Footer />
    </div>
  )
}
