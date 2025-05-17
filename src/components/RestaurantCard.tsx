'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, DollarSign, MapPin, Shield, Truck } from 'lucide-react'
import { cn } from '../utils/theme'

interface RestaurantCardProps {
  name: string
  cuisine: string
  time: string
  fee: string
  rating: number | string
  logo: string
  href?: string
  index?: number
  featured?: boolean
}

export default function RestaurantCard({ 
  name, 
  cuisine, 
  time, 
  fee, 
  rating, 
  logo, 
  href = '#',
  index = 0,
  featured = false
}: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100 
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative",
        "bg-white dark:bg-gray-800", 
        "rounded-xl overflow-hidden",
        "shadow-sm hover:shadow-md",
        "border border-gray-100 dark:border-gray-700",
        "transition-all duration-300",
        featured && "ring-2 ring-accent-500 ring-offset-2 dark:ring-offset-gray-900"
      )}
    >
      <Link href={href} className="block">
        <div className="p-4 flex gap-4">
          {/* Restaurant Logo */}
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-16 h-16 rounded-lg overflow-hidden"
            >
              <Image 
                src={logo} 
                alt={name}
                width={64}
                height={64}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>
            {featured && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
              >
                Featured
              </motion.div>
            )}
          </div>
          
          {/* Restaurant Info */}
          <div className="flex-1">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors"
            >
              {name}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {cuisine}
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-600 dark:text-gray-300"
            >
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-yellow-500" fill="currentColor" />
                <span>
                  {typeof rating === 'number' 
                    ? rating.toFixed(1) 
                    : typeof rating === 'string' && !isNaN(parseFloat(rating))
                      ? parseFloat(rating).toFixed(1)
                      : rating}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-gray-400" />
                <span>{time}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                <span>{fee}</span>
              </div>
            </motion.div>
            
            {/* Features */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mt-2 text-xs font-medium text-success-600 dark:text-success-400"
            >
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>Live Tracking</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Contactless</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
