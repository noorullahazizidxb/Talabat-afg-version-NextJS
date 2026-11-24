'use client'

import type { Ref } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Star, Truck } from 'lucide-react'
import { cn } from '@/utils/theme'
import type { ApiRestaurant } from '@/utils/api'
import { fadeUp, lift, revealViewport } from '@/utils/motion'

interface RestaurantCardProps {
  restaurant: ApiRestaurant
  /** Forwarded to the list item so AnimatePresence `popLayout` can measure exiting cards. */
  ref?: Ref<HTMLLIElement>
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-ring)]'

/** Restaurant tile for listing grids. Renders an `<li>`, so place it inside a `<ul>`. */
export default function RestaurantCard({ restaurant, ref }: RestaurantCardProps) {
  const freeDelivery = restaurant.deliveryFee === 0

  return (
    <motion.li
      ref={ref}
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={revealViewport}
    >
      <motion.div {...lift} className="h-full">
        <Link
          href={`/restaurants/${restaurant.slug}`}
          className={cn(
            'group block h-full overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300',
            'border-[var(--theme-border)] bg-[var(--theme-surface)]',
            'hover:border-orange-300 hover:shadow-xl hover:shadow-orange-900/10 dark:hover:border-orange-500/40 dark:hover:shadow-black/40',
            focusRing
          )}
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--theme-surface-elevated)]">
            {restaurant.coverImageUrl ? (
              <Image
                src={restaurant.coverImageUrl}
                alt=""
                fill
                sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 dark:from-orange-950 dark:via-orange-900/60 dark:to-amber-900/40">
                <span
                  className="select-none text-6xl font-black text-orange-600/30 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none dark:text-orange-300/30"
                  aria-hidden="true"
                >
                  {restaurant.name[0]}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span
              className={cn(
                'absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur',
                restaurant.isOpen ? 'bg-white/95 text-emerald-700' : 'bg-gray-900/80 text-gray-100'
              )}
            >
              <span className={cn('h-1.5 w-1.5 rounded-full', restaurant.isOpen ? 'bg-emerald-500' : 'bg-gray-400')} aria-hidden="true" />
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </span>
            {freeDelivery && (
              <span className="absolute right-3 top-3 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                Free delivery
              </span>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="truncate text-base font-bold text-[var(--theme-text)]">{restaurant.name}</h3>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {restaurant.rating.toFixed(1)}
                <span className="sr-only"> rating</span>
              </span>
            </div>
            <p className="mt-0.5 truncate text-sm text-[var(--theme-text-muted)]">
              {restaurant.cuisines.map(c => c.name).join(', ')}
            </p>
            <div className="mt-3 flex items-center gap-4 border-t border-[var(--theme-border)] pt-3 text-xs text-[var(--theme-text-muted)]">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {restaurant.estimatedDeliveryTime} min
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                {freeDelivery ? (
                  <span className="font-semibold text-[var(--theme-success)]">Free</span>
                ) : (
                  `AED ${restaurant.deliveryFee}`
                )}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.li>
  )
}
