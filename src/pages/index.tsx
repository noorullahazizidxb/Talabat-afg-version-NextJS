import LocationSearch from '@/components/LocationSearch'
import { useState } from 'react'
import AuthModal from '@/components/AuthModal'
import '@/styles/globals.css'
import MainNavbar from '@/components/navbar/MainNavbar'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ShoppingBag, ShoppingCart, Flower,
  Pill, Heart, Star, Clock, Truck, Shield,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/theme'
import Footer from '@/components/Footer'

const categoryCards = [
  {
    id: 'food',
    title: 'Order food',
    description: 'Find deals, free delivery, and more from your favourite restaurants',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop',
    icon: <ShoppingBag className="h-5 w-5" />,
    href: '/category/food',
    buttonText: 'Order now',
    accent: 'from-orange-500 to-red-500',
  },
  {
    id: 'groceries',
    title: 'Order groceries',
    description: "Don't stand in line. Get groceries delivered to your door",
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop',
    icon: <ShoppingCart className="h-5 w-5" />,
    href: '/grocery',
    buttonText: 'Shop now',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'flowers',
    title: 'Order flowers',
    description: 'Say it with flowers — delivered fresh to your loved ones',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=500&auto=format&fit=crop',
    icon: <Flower className="h-5 w-5" />,
    href: '/category/flowers',
    buttonText: 'Shop now',
    accent: 'from-pink-500 to-rose-500',
  },
  {
    id: 'medicine',
    title: 'Order medicine',
    description: 'Get the medicine you need delivered safely to your door',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop',
    icon: <Pill className="h-5 w-5" />,
    href: '/category/medicine',
    buttonText: 'Shop now',
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'donations',
    title: 'Donations',
    description: 'Help those in need — together we can make a difference',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=500&auto=format&fit=crop',
    icon: <Heart className="h-5 w-5" />,
    href: '/donations',
    buttonText: 'Donate now',
    accent: 'from-violet-500 to-purple-500',
  },
  {
    id: 'mart',
    title: 'talabat mart',
    description: 'Get anything you need, delivered in 20 minutes',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=500&auto=format&fit=crop',
    icon: <ShoppingBag className="h-5 w-5" />,
    href: '/talabat-mart',
    buttonText: 'Shop now',
    accent: 'from-amber-500 to-orange-500',
  },
]

const features = [
  { icon: Clock, title: 'Fast delivery', desc: 'Get your order in 30 min or less' },
  { icon: Shield, title: 'Safe & secure', desc: 'Your data and payments are protected' },
  { icon: Truck, title: 'Free delivery', desc: 'On your first 3 orders with us' },
  { icon: Star, title: 'Top rated', desc: 'Over 50,000 five-star reviews' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 16 } },
}

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const router = useRouter()

  const handleLocationSelected = (_location: string) => {
    router.push('/restaurants')
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <MainNavbar />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 dark:from-orange-950 dark:via-orange-900 dark:to-orange-800">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />

          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="mb-6"
              >
                <Image
                  src="/images/logo.png"
                  alt="Talabat"
                  width={180}
                  height={56}
                  className="mx-auto drop-shadow-xl"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight"
              >
                Everything you need,
                <br />
                <span className="text-orange-100">delivered fast</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-lg text-orange-100/90 mb-8 max-w-md"
              >
                Food, groceries, flowers & more — delivered to your door in minutes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="w-full max-w-lg"
              >
                <LocationSearch />
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                onClick={() => setAuthOpen(true)}
                className="mt-5 btn-pill btn-outline text-sm"
              >
                Sign in or create account
              </motion.button>
            </div>
          </div>
        </section>

        {/* ── Features strip ───────────────────────────────────────── */}
        <section className="bg-orange-50 dark:bg-slate-900 border-y border-orange-100 dark:border-slate-800">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                >
                  <div className="shrink-0 p-2 rounded-lg bg-orange-500/10 dark:bg-orange-400/10">
                    <f.icon className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{f.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Category cards ───────────────────────────────────────── */}
        <section className="py-16 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">What can we get you?</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Choose a category and we'll find the best options near you.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoryCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={cn(
                      'absolute inset-0 z-10 opacity-60 bg-gradient-to-br',
                      card.accent
                    )} />
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Icon badge */}
                    <div className="absolute top-4 left-4 z-20 p-2 rounded-xl bg-white/25 backdrop-blur-sm text-white shadow">
                      {card.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    <Link href={card.href}>
                      <span className={cn(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200',
                        `bg-gradient-to-r ${card.accent}`,
                        'hover:opacity-90 hover:shadow-md cursor-pointer'
                      )}>
                        {card.buttonText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </div>

      <Footer />
    </>
  )
}

