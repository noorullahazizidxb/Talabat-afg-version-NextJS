'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, DollarSign, Truck, Badge } from 'lucide-react'
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
  coverImage?: string
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
  featured = false,
  coverImage,
}: RestaurantCardProps) {
  const ratingNum =
    typeof rating === 'number'
      ? rating
      : parseFloat(String(rating)) || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05, type: 'spring', stiffness: 80 }}
      className={cn(
        'group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden',
        'border border-slate-100 dark:border-slate-800',
        'shadow-sm hover:shadow-lg transition-shadow duration-300',
        featured && 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-slate-950'
      )}
    >
      <Link href={href} className="block">
        {/* Cover image strip */}
        {coverImage && (
          <div className="relative h-28 overflow-hidden">
            <Image
              src={coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          </div>
        )}

        <div className="p-4 flex gap-3">
          {/* Logo */}
          <div className="relative shrink-0">
            <div className={cn(
              'relative w-14 h-14 rounded-xl overflow-hidden border-2',
              coverImage ? '-mt-7 shadow-lg border-white dark:border-slate-900' : 'border-slate-100 dark:border-slate-700'
            )}>
              <Image src={logo} alt={name} fill className="object-cover" />
            </div>
            {featured && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                TOP
              </span>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-orange-500 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{cuisine}</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" />
                {ratingNum.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {time}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-slate-400" />
                {fee === 'Free' || fee === '$0' ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Free</span>
                ) : fee}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

