import LocationSearch from '@/components/LocationSearch'
import { useState, useEffect } from 'react'
import AuthModal from '@/components/AuthModal'
import '@/styles/globals.css'
import MainNavbar from '@/components/navbar/MainNavbar'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, ShoppingCart, Flower, Pill, Heart, Moon, Sun, LogIn, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme, cn } from '@/utils/theme'
import Footer from '@/components/Footer'

const categoryCards = [
  {
    id: 'food',
    title: 'Order food',
    description: 'Find deals, free delivery, and time from your favorite restaurants',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop',
    icon: <ShoppingBag className="h-6 w-6" />,
    href: '/category/food',
    buttonText: 'Order now'
  },
  {
    id: 'groceries',
    title: 'Order groceries',
    description: 'Don\'t stand in line. Order from your favorite stores and get groceries delivered to you',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500&auto=format&fit=crop',
    icon: <ShoppingCart className="h-6 w-6" />,
    href: '/grocery',
    buttonText: 'Shop now'
  },
  {
    id: 'flowers',
    title: 'Order flowers',
    description: 'Whatever the occasion, say it with flowers. We deliver to your loved ones',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=500&auto=format&fit=crop',
    icon: <Flower className="h-6 w-6" />,
    href: '/category/flowers',
    buttonText: 'Shop now'
  },
  {
    id: 'medicine',
    title: 'Order medicine',
    description: 'Get the medicine you need delivered to your door',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop',
    icon: <Pill className="h-6 w-6" />,
    href: '/category/medicine',
    buttonText: 'Shop now'
  },
  {
    id: 'donations',
    title: 'Donations',
    description: 'Help those in need with a donation. Together we can make a difference',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=500&auto=format&fit=crop',
    icon: <Heart className="h-6 w-6" />,
    href: '/donations',
    buttonText: 'Donate now'
  },
  {
    id: 'mart',
    title: 'talabat mart',
    description: 'Get anything you need, delivered in 20 minutes with talabat mart',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?q=80&w=500&auto=format&fit=crop',
    icon: <ShoppingBag className="h-6 w-6" />,
    href: '/talabat-mart',
    buttonText: 'Shop now'
  }
];

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const router = useRouter()
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Handle location selection redirect
  const handleLocationSelected = (location: string) => {
    // Redirect to restaurants page with the selected location
    router.push('/restaurants')
  }

  return (
    <>
    <div className={cn(
      "min-h-screen transition-colors duration-200",
      isDark ? "bg-gray-900 text-white" : "bg-orange-50 text-gray-900"
    )}>
      <MainNavbar />
      

      {/* Hero section */}
      <div className={cn(
        "text-white py-12 transition-colors duration-200",
        isDark ? "bg-orange-900" : "bg-orange-500"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Image 
                src="/images/logo.png" 
                alt="Talabat" 
                width={200} 
                height={60} 
                className="mx-auto"
              />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Welcome to talabat
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-white mb-8"
            >
              Fast delivery of food, groceries and more
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full max-w-md"
            >
              <LocationSearch />
            </motion.div>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={() => setAuthOpen(true)} 
              className="mt-6 text-white font-medium hover:bg-orange-600 px-4 py-1.5 rounded-[30px] border border-white transition-colors flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Login or Signup
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Category cards section */}
      <div className={cn(
        "py-12 transition-colors duration-200",
        isDark ? "bg-gray-800" : "bg-white"
      )}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 50
                }}
                className={cn(
                  "rounded-xl overflow-hidden shadow-md transition-colors duration-200",
                  isDark 
                    ? "bg-gray-700 border border-gray-600" 
                    : "bg-white border border-orange-100"
                )}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10" />
                  <div className={cn(
                    "absolute top-4 left-4 z-20 text-white p-2 rounded-[30px] transition-colors duration-200 border border-white",
                    isDark ? "bg-orange-700" : "bg-orange-500"
                  )}>
                    {card.icon}
                  </div>
                  <Image 
                    src={card.image} 
                    alt={card.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-5">
                  <h3 className={cn(
                    "text-xl font-bold mb-2 transition-colors duration-200",
                    isDark ? "text-gray-100" : "text-gray-800"
                  )}>{card.title}</h3>
                  <p className={cn(
                    "text-sm mb-4 transition-colors duration-200",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}>{card.description}</p>
                  
                  <Link href={card.href}>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-[30px] text-white font-medium transition-all duration-200 border border-white",
                      isDark 
                        ? "bg-orange-700 hover:bg-orange-800" 
                        : "bg-orange-500 hover:bg-orange-600"
                    )}>
                      {card.buttonText}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
    <Footer/>
  </>
  )
}
