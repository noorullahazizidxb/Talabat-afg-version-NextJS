'use client'

import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Star, Clock, Truck, X, ShoppingCart, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { cn } from '@/utils/theme'
import { api, ApiRestaurant, ApiCuisine, PaginatedResponse } from '@/utils/api'
import { useCartStore } from '@/store/cartStore'

const DEMO: ApiRestaurant[] = [
  { id: '1', name: 'Vegan Burger', slug: 'vegan-burger', isOpen: true, rating: 4.8, reviewCount: 132, estimatedDeliveryTime: 47, deliveryFee: 0, freeDeliveryThreshold: 40, minOrderAmount: 20, preparationTime: 15, lat: 0, lng: 0, address: 'Al Barsha', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c1', name: 'Burgers', slug: 'burgers' }, { id: 'c2', name: 'Healthy', slug: 'healthy' }], area: { id: 'a1', name: 'Al Barsha', slug: 'al-barsha', city: 'Dubai' } } as ApiRestaurant,
  { id: '2', name: 'Japanese Talk', slug: 'japanese-talk', isOpen: true, rating: 4.9, reviewCount: 512, estimatedDeliveryTime: 28, deliveryFee: 8, minOrderAmount: 60, preparationTime: 20, lat: 0, lng: 0, address: 'Dubai Marina', acceptsCash: true, acceptsCard: true, cuisines: [{ id: 'c3', name: 'Japanese', slug: 'japanese' }, { id: 'c4', name: 'Seafood', slug: 'seafood' }], area: { id: 'a2', name: 'Dubai Marina', slug: 'dubai-marina', city: 'Dubai' } } as ApiRestaurant,
  { id: '3', name: 'Oregano', slug: 'oregano', isOpen: true, rating: 4.5, reviewCount: 245, estimatedDeliveryTime: 37, deliveryFee: 0, freeDeliveryThreshold: 50, minOrderAmount: 30, preparationTime: 15, lat: 0, lng: 0, address: 'Jumeirah', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c5', name: 'Italian', slug: 'italian' }, { id: 'c6', name: 'Pizza', slug: 'pizza' }], area: { id: 'a3', name: 'Jumeirah', slug: 'jumeirah', city: 'Dubai' } } as ApiRestaurant,
  { id: '4', name: 'Spicy House', slug: 'spicy-house', isOpen: true, rating: 4.7, reviewCount: 189, estimatedDeliveryTime: 32, deliveryFee: 5, minOrderAmount: 25, preparationTime: 15, lat: 0, lng: 0, address: 'Business Bay', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c7', name: 'Indian', slug: 'indian' }], area: { id: 'a4', name: 'Business Bay', slug: 'business-bay', city: 'Dubai' } } as ApiRestaurant,
  { id: '5', name: 'Arz Lebanon', slug: 'arz-lebanon', isOpen: true, rating: 4.7, reviewCount: 328, estimatedDeliveryTime: 35, deliveryFee: 5, minOrderAmount: 40, preparationTime: 20, lat: 0, lng: 0, address: 'Downtown Dubai', acceptsCash: true, acceptsCard: true, cuisines: [{ id: 'c8', name: 'Lebanese', slug: 'lebanese' }, { id: 'c0', name: 'Arabic', slug: 'arabic' }], area: { id: 'a5', name: 'Downtown Dubai', slug: 'downtown-dubai', city: 'Dubai' } } as ApiRestaurant,
  { id: '6', name: 'Thai Wok', slug: 'thai-wok', isOpen: true, rating: 4.6, reviewCount: 178, estimatedDeliveryTime: 35, deliveryFee: 7, minOrderAmount: 40, preparationTime: 15, lat: 0, lng: 0, address: 'Bur Dubai', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c9', name: 'Thai', slug: 'thai' }], area: { id: 'a6', name: 'Bur Dubai', slug: 'bur-dubai', city: 'Dubai' } } as ApiRestaurant,
]

type SortKey = 'rating' | 'deliveryTime' | 'deliveryFee' | 'name'

interface Filters {
  cuisineSlug: string
  freeDelivery: boolean
  openNow: boolean
  sortBy: SortKey
}

const DEFAULT_FILTERS: Filters = { cuisineSlug: '', freeDelivery: false, openNow: false, sortBy: 'rating' }

function RestaurantCard({ restaurant, index }: { restaurant: ApiRestaurant; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), type: 'spring', stiffness: 100 }}
    >
      <Link href={`/restaurants/${restaurant.slug}`} className="group block">
        <div className={cn(
          'rounded-2xl overflow-hidden border transition-all duration-300',
          'bg-[var(--theme-surface)] border-[var(--theme-border)]',
          'hover:shadow-lg hover:-translate-y-1 hover:border-[var(--theme-primary)]/30'
        )}>
          <div className="relative h-44 bg-[var(--theme-surface-elevated)] overflow-hidden">
            {restaurant.coverImageUrl ? (
              <Image src={restaurant.coverImageUrl} alt={restaurant.name} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,var(--theme-brand-start)22,var(--theme-brand-end)22)' }}>
                <span className="text-5xl font-black text-[var(--theme-primary)] opacity-20 select-none">{restaurant.name[0]}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className={cn('absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold', restaurant.isOpen ? 'bg-green-500 text-white' : 'bg-gray-700/80 text-gray-300')}>
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-base text-[var(--theme-text)] truncate">{restaurant.name}</h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5 truncate">{restaurant.cuisines.map(c => c.name).join(' · ')}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-[var(--theme-text-muted)]">
              <span className="flex items-center gap-1 font-semibold text-[var(--theme-text)]">
                <Star className="h-3.5 w-3.5 fill-[var(--theme-accent)] text-[var(--theme-accent)]" />
                {restaurant.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{restaurant.estimatedDeliveryTime} min</span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" />
                {restaurant.deliveryFee === 0 ? <span className="text-[var(--theme-success)] font-semibold">Free</span> : `AED ${restaurant.deliveryFee}`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-surface)]">
      <div className="h-44 animate-pulse bg-[var(--theme-border)]" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--theme-border)]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--theme-border)]" />
        <div className="h-3 w-full animate-pulse rounded bg-[var(--theme-border)]" />
      </div>
    </div>
  )
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<ApiRestaurant[]>([])
  const [cuisines, setCuisines] = useState<ApiCuisine[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const totalItems = useCartStore(s => s.totalItems)

  useEffect(() => {
    Promise.all([
      api.get<PaginatedResponse<ApiRestaurant>>('/restaurants', { limit: 50 }).catch(() => null),
      api.get<ApiCuisine[]>('/cuisines').catch(() => null),
    ]).then(([restResp, cuis]) => {
      setRestaurants(restResp?.data ?? DEMO)
      setCuisines(Array.isArray(cuis) ? cuis : [])
      setLoading(false)
    })
  }, [])

  const activeFilterCount = [filters.cuisineSlug !== '', filters.freeDelivery, filters.openNow, filters.sortBy !== 'rating'].filter(Boolean).length

  const displayed = useMemo(() => {
    let list = restaurants.filter(r => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.cuisines.some(c => c.name.toLowerCase().includes(search.toLowerCase()))) return false
      if (filters.cuisineSlug && !r.cuisines.some(c => c.slug === filters.cuisineSlug)) return false
      if (filters.freeDelivery && r.deliveryFee > 0) return false
      if (filters.openNow && !r.isOpen) return false
      return true
    })
    if (filters.sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    else if (filters.sortBy === 'deliveryTime') list = [...list].sort((a, b) => a.estimatedDeliveryTime - b.estimatedDeliveryTime)
    else if (filters.sortBy === 'deliveryFee') list = [...list].sort((a, b) => a.deliveryFee - b.deliveryFee)
    else if (filters.sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [restaurants, search, filters])

  const setFilter = <K extends keyof Filters>(key: K, val: Filters[K]) => setFilters(prev => ({ ...prev, [key]: val }))

  return (
    <>
      <Head><title>Restaurants Near You — Talabat</title></Head>
      <Header />
      <main className="min-h-screen bg-[var(--theme-background)]">
        <div className="border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="container mx-auto max-w-6xl px-4 py-6">
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-[var(--theme-text)] mb-4">
              Restaurants near you
            </motion.h1>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--theme-text-muted)]" />
                <input type="text" placeholder="Search restaurants or cuisines…" value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] py-3 pl-10 pr-10 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent" />
                {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]"><X className="h-4 w-4" /></button>}
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setFiltersOpen(v => !v)}
                className={cn('flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors', activeFilterCount > 0 ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white' : 'border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)]')}>
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:block">Filters</span>
                {activeFilterCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold">{activeFilterCount}</span>}
              </motion.button>
            </div>
            {cuisines.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                <button onClick={() => setFilter('cuisineSlug', '')} className={cn('shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all', filters.cuisineSlug === '' ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-surface-elevated)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]')}>All</button>
                {cuisines.slice(0, 12).map(c => (
                  <button key={c.id} onClick={() => setFilter('cuisineSlug', filters.cuisineSlug === c.slug ? '' : c.slug)}
                    className={cn('shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all', filters.cuisineSlug === c.slug ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-surface-elevated)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]')}>
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {filtersOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
              className="overflow-hidden border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
              <div className="container mx-auto max-w-6xl px-4 py-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-[var(--theme-text-muted)]">Sort:</span>
                    {(['rating', 'deliveryTime', 'deliveryFee', 'name'] as SortKey[]).map(s => (
                      <button key={s} onClick={() => setFilter('sortBy', s)}
                        className={cn('rounded-full px-3 py-1.5 text-xs font-medium transition-all', filters.sortBy === s ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-background)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]')}>
                        {s === 'rating' ? '⭐ Rating' : s === 'deliveryTime' ? '⏱ Fastest' : s === 'deliveryFee' ? '🚚 Cheapest delivery' : '🔤 Name'}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--theme-text)]">
                      <input type="checkbox" checked={filters.freeDelivery} onChange={e => setFilter('freeDelivery', e.target.checked)} className="accent-[var(--theme-primary)]" />Free delivery
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--theme-text)]">
                      <input type="checkbox" checked={filters.openNow} onChange={e => setFilter('openNow', e.target.checked)} className="accent-[var(--theme-primary)]" />Open now
                    </label>
                  </div>
                  {activeFilterCount > 0 && (
                    <button onClick={() => setFilters(DEFAULT_FILTERS)} className="flex items-center gap-1 text-xs text-[var(--theme-danger)] ml-auto">
                      <RotateCcw className="h-3.5 w-3.5" />Reset
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto max-w-6xl px-4 py-6">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <Search className="h-12 w-12 text-[var(--theme-text-muted)] opacity-30" />
              <p className="text-lg font-semibold text-[var(--theme-text)]">No restaurants found</p>
              <p className="text-sm text-[var(--theme-text-muted)]">Try adjusting your filters or search</p>
              <button onClick={() => { setSearch(''); setFilters(DEFAULT_FILTERS) }} className="text-[var(--theme-primary)] text-sm font-medium">Clear filters</button>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--theme-text-muted)] mb-5">{displayed.length} restaurant{displayed.length !== 1 ? 's' : ''} available</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {displayed.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
              </div>
            </>
          )}
        </div>
      </main>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[var(--theme-primary)] px-5 py-3 text-white shadow-2xl font-semibold text-sm">
            <ShoppingCart className="h-4 w-4" />{totalItems}
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  )
}
