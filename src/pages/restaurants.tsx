'use client'

import Head from 'next/head'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ShoppingCart } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import RestaurantCard from '@/components/RestaurantCard'
import FiltersPanel, { DEFAULT_FILTERS, FilterChip, countActiveFilters, type RestaurantFilters } from '@/components/FiltersPanel'
import { cn } from '@/utils/theme'
import { api, ApiRestaurant, ApiCuisine, PaginatedResponse } from '@/utils/api'
import { selectItemCount, useCartStore } from '@/store/cartStore'
import { fadeUp, floatUp, press, spring } from '@/utils/motion'

const DEMO: ApiRestaurant[] = [
  { id: '1', name: 'Vegan Burger', slug: 'vegan-burger', isOpen: true, rating: 4.8, reviewCount: 132, estimatedDeliveryTime: 47, deliveryFee: 0, freeDeliveryThreshold: 40, minOrderAmount: 20, preparationTime: 15, lat: 0, lng: 0, address: 'Al Barsha', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c1', name: 'Burgers', slug: 'burgers' }, { id: 'c2', name: 'Healthy', slug: 'healthy' }], area: { id: 'a1', name: 'Al Barsha', slug: 'al-barsha', city: 'Dubai' } } as ApiRestaurant,
  { id: '2', name: 'Japanese Talk', slug: 'japanese-talk', isOpen: true, rating: 4.9, reviewCount: 512, estimatedDeliveryTime: 28, deliveryFee: 8, minOrderAmount: 60, preparationTime: 20, lat: 0, lng: 0, address: 'Dubai Marina', acceptsCash: true, acceptsCard: true, cuisines: [{ id: 'c3', name: 'Japanese', slug: 'japanese' }, { id: 'c4', name: 'Seafood', slug: 'seafood' }], area: { id: 'a2', name: 'Dubai Marina', slug: 'dubai-marina', city: 'Dubai' } } as ApiRestaurant,
  { id: '3', name: 'Oregano', slug: 'oregano', isOpen: true, rating: 4.5, reviewCount: 245, estimatedDeliveryTime: 37, deliveryFee: 0, freeDeliveryThreshold: 50, minOrderAmount: 30, preparationTime: 15, lat: 0, lng: 0, address: 'Jumeirah', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c5', name: 'Italian', slug: 'italian' }, { id: 'c6', name: 'Pizza', slug: 'pizza' }], area: { id: 'a3', name: 'Jumeirah', slug: 'jumeirah', city: 'Dubai' } } as ApiRestaurant,
  { id: '4', name: 'Spicy House', slug: 'spicy-house', isOpen: true, rating: 4.7, reviewCount: 189, estimatedDeliveryTime: 32, deliveryFee: 5, minOrderAmount: 25, preparationTime: 15, lat: 0, lng: 0, address: 'Business Bay', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c7', name: 'Indian', slug: 'indian' }], area: { id: 'a4', name: 'Business Bay', slug: 'business-bay', city: 'Dubai' } } as ApiRestaurant,
  { id: '5', name: 'Arz Lebanon', slug: 'arz-lebanon', isOpen: true, rating: 4.7, reviewCount: 328, estimatedDeliveryTime: 35, deliveryFee: 5, minOrderAmount: 40, preparationTime: 20, lat: 0, lng: 0, address: 'Downtown Dubai', acceptsCash: true, acceptsCard: true, cuisines: [{ id: 'c8', name: 'Lebanese', slug: 'lebanese' }, { id: 'c0', name: 'Arabic', slug: 'arabic' }], area: { id: 'a5', name: 'Downtown Dubai', slug: 'downtown-dubai', city: 'Dubai' } } as ApiRestaurant,
  { id: '6', name: 'Thai Wok', slug: 'thai-wok', isOpen: true, rating: 4.6, reviewCount: 178, estimatedDeliveryTime: 35, deliveryFee: 7, minOrderAmount: 40, preparationTime: 15, lat: 0, lng: 0, address: 'Bur Dubai', acceptsCash: true, acceptsCard: false, cuisines: [{ id: 'c9', name: 'Thai', slug: 'thai' }], area: { id: 'a6', name: 'Bur Dubai', slug: 'bur-dubai', city: 'Dubai' } } as ApiRestaurant,
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-ring)]'

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)]" aria-hidden="true">
      <div className="aspect-[16/9] animate-pulse bg-[var(--theme-border)] motion-reduce:animate-none" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--theme-border)] motion-reduce:animate-none" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--theme-border)] motion-reduce:animate-none" />
        <div className="h-3 w-full animate-pulse rounded bg-[var(--theme-border)] motion-reduce:animate-none" />
      </div>
    </div>
  )
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<ApiRestaurant[]>([])
  const [cuisines, setCuisines] = useState<ApiCuisine[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<RestaurantFilters>(DEFAULT_FILTERS)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const totalItems = useCartStore(selectItemCount)

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

  const activeFilterCount = countActiveFilters(filters)

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

  const cuisineChips = useMemo<ApiCuisine[]>(() => {
    if (cuisines.length > 0) return cuisines.slice(0, 12)
    const unique = new Map<string, ApiCuisine>()
    restaurants.forEach(r => r.cuisines.forEach(c => unique.set(c.slug, c)))
    return [...unique.values()].slice(0, 12)
  }, [cuisines, restaurants])

  const resetAll = () => {
    setSearch('')
    setFilters(DEFAULT_FILTERS)
  }

  const setFilter = <K extends keyof RestaurantFilters>(key: K, val: RestaurantFilters[K]) => setFilters(prev => ({ ...prev, [key]: val }))

  return (
    <>
      <Head><title>Restaurants Near You — Talabat</title></Head>
      <Header />
      <main className="min-h-screen bg-[var(--theme-background)]">
        <div className="border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="container mx-auto max-w-6xl px-4 py-6">
            <h1 className="mb-4 text-balance text-2xl font-bold tracking-tight text-[var(--theme-text)] md:text-3xl">
              Restaurants near you
            </h1>
            <div className="flex gap-2">
              <div className="relative min-w-0 flex-1">
                <label htmlFor="restaurant-search" className="sr-only">Search restaurants or cuisines</label>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--theme-text-muted)]" aria-hidden="true" />
                <input id="restaurant-search" type="search" placeholder="Search restaurants or cuisines…" value={search} onChange={e => setSearch(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] pl-10 pr-11 text-base text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--theme-ring)] [&::-webkit-search-cancel-button]:hidden" />
                <AnimatePresence>
                  {search && (
                    <motion.button
                      {...press}
                      type="button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearch('')}
                      aria-label="Clear search"
                      className={cn('absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]', focusRing)}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <motion.button {...press} type="button" onClick={() => setFiltersOpen(v => !v)}
                aria-expanded={filtersOpen} aria-controls="restaurant-filters"
                aria-label={activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : 'Filters'}
                className={cn('flex h-12 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors', focusRing,
                  activeFilterCount > 0 ? 'border-orange-700 bg-orange-700 text-white' : 'border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text)] hover:border-orange-400')}>
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:block">Filters</span>
                <AnimatePresence>
                  {activeFilterCount > 0 && (
                    <motion.span key={activeFilterCount} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={spring.snappy}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
                      {activeFilterCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            {cuisineChips.length > 0 && (
              <div role="group" aria-label="Cuisine" className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
                <FilterChip group="cuisine" active={filters.cuisineSlug === ''} onClick={() => setFilter('cuisineSlug', '')}>
                  All
                </FilterChip>
                {cuisineChips.map(c => {
                  const active = filters.cuisineSlug === c.slug
                  return (
                    <FilterChip key={c.id} group="cuisine" active={active} onClick={() => setFilter('cuisineSlug', active ? '' : c.slug)}>
                      {c.name}
                    </FilterChip>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <FiltersPanel
          id="restaurant-filters"
          open={filtersOpen}
          filters={filters}
          onChange={setFilter}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />

        <div className="container mx-auto max-w-6xl px-4 py-6">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading restaurants">{[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : displayed.length === 0 ? (
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--theme-surface-elevated)]">
                <Search className="h-7 w-7 text-[var(--theme-text-muted)]" aria-hidden="true" />
              </span>
              <p className="text-lg font-semibold text-[var(--theme-text)]">No restaurants found</p>
              <p className="text-sm text-[var(--theme-text-muted)]">Try adjusting your filters or search</p>
              <motion.button {...press} type="button" onClick={resetAll} className={cn('mt-2 h-10 rounded-full bg-orange-700 px-5 text-sm font-semibold text-white hover:bg-orange-800', focusRing)}>Clear filters</motion.button>
            </motion.div>
          ) : (
            <>
              <p className="mb-5 text-sm text-[var(--theme-text-muted)]" aria-live="polite">{displayed.length} restaurant{displayed.length !== 1 ? 's' : ''} available</p>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {displayed.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
                </AnimatePresence>
              </ul>
            </>
          )}
        </div>
      </main>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button {...press} type="button" variants={floatUp} initial="hidden" animate="visible" exit="exit"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            className={cn('fixed bottom-6 right-6 z-30 flex h-12 items-center gap-2 rounded-full bg-orange-700 px-5 text-sm font-semibold text-white shadow-2xl shadow-orange-900/30 hover:bg-orange-800', focusRing)}>
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />{totalItems}
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  )
}
