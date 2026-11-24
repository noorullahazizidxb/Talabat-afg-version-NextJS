import LocationSearch from '@/components/LocationSearch'
import { useState } from 'react'
import AuthModal from '@/components/AuthModal'
import '@/styles/globals.css'
import MainNavbar from '@/components/navbar/MainNavbar'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, ShoppingCart, Flower, Pill, Heart, UserPlus } from 'lucide-react'
import Footer from '@/components/Footer'
import SectionCard, { type SectionCardProps } from '@/components/SectionCard'
import { press, revealViewport, staggerContainer } from '@/utils/motion'

interface CategoryCard extends SectionCardProps {
  id: string
}

const categoryCards: CategoryCard[] = [
  {
    id: 'food',
    title: 'Order food',
    description: 'Find deals, free delivery, and time from your favorite restaurants',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop',
    icon: ShoppingBag,
    href: '/restaurants',
    buttonText: 'Order now'
  },
  {
    id: 'groceries',
    title: 'Order groceries',
    description: 'Don\'t stand in line. Order from your favorite stores and get groceries delivered to you',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop',
    icon: ShoppingCart,
    href: '/grocery',
    buttonText: 'Shop now'
  },
  {
    id: 'flowers',
    title: 'Order flowers',
    description: 'Whatever the occasion, say it with flowers. We deliver to your loved ones',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=500&auto=format&fit=crop',
    icon: Flower,
    href: '/flowers',
    buttonText: 'Shop now'
  },
  {
    id: 'medicine',
    title: 'Order medicine',
    description: 'Get the medicine you need delivered to your door',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop',
    icon: Pill,
    href: '/catagory/medicine',
    buttonText: 'Shop now'
  },
  {
    id: 'donations',
    title: 'Donations',
    description: 'Help those in need with a donation. Together we can make a difference',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=500&auto=format&fit=crop',
    icon: Heart,
    href: '/catagory/donations',
    buttonText: 'Donate now'
  },
  {
    id: 'mart',
    title: 'talabat mart',
    description: 'Get anything you need, delivered in 20 minutes with talabat mart',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=500&auto=format&fit=crop',
    icon: ShoppingBag,
    href: '/catagory/mart',
    buttonText: 'Shop now'
  }
];

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
    <div className="min-h-screen bg-orange-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <MainNavbar />

      <section
        aria-labelledby="home-hero-title"
        className="relative isolate overflow-hidden bg-orange-500 py-14 text-white transition-colors duration-200 md:py-20 dark:bg-orange-900"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.22),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(124,45,18,0.45),transparent_50%)]"
        />
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
            <Image
              src="/images/logo.png"
              alt="Talabat"
              width={200}
              height={60}
              priority
              className="mx-auto mb-8 h-auto w-[160px] md:w-[200px]"
            />

            <h1
              id="home-hero-title"
              className="mb-4 text-balance text-4xl font-extrabold tracking-tight text-white md:text-6xl"
            >
              Welcome to talabat
            </h1>

            <p className="mb-8 text-pretty text-lg text-white/90 md:text-xl">
              Fast delivery of food, groceries and more
            </p>

            <div className="w-full max-w-xl">
              <LocationSearch />
            </div>

            <motion.button
              {...press}
              type="button"
              onClick={() => setAuthOpen(true)}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-white/80 px-5 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Login or Signup
            </motion.button>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-categories-title"
        className="bg-white py-12 transition-colors duration-200 md:py-16 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <h2
            id="home-categories-title"
            className="mb-8 text-balance text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-gray-100"
          >
            What can we bring you today?
          </h2>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={staggerContainer(0.07)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {categoryCards.map(({ id, ...card }) => (
              <SectionCard key={id} {...card} />
            ))}
          </motion.ul>
        </div>
      </section>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
    <Footer/>
  </>
  )
}
