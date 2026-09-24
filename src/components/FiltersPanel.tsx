'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Star, Truck, Tag, X } from 'lucide-react'

export interface FilterState {
  cuisines: string[]
  priceRange: number
  sortBy: 'rating' | 'delivery_time' | 'price'
  deals: boolean
  freeDelivery: boolean
  pickup: boolean
}

const cuisineOptions = [
  '🍔 Burgers', '🍣 Sushi', '🍕 Pizza',
  '🥗 Salad', '🍰 Dessert', '🌱 Vegan',
  '🍛 Indian', '🍜 Asian',
]

export default function FiltersPanel({
  onFilterChange,
}: {
  onFilterChange?: (filters: FilterState) => void
}) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('rating')
  const [deals, setDeals] = useState(false)
  const [freeDelivery, setFreeDelivery] = useState(false)
  const [pickup, setPickup] = useState(false)

  const notify = (partial: Partial<FilterState> = {}) => {
    onFilterChange?.({
      cuisines: selectedCuisines,
      priceRange,
      sortBy,
      deals,
      freeDelivery,
      pickup,
      ...partial,
    })
  }

  const toggleCuisine = (c: string) => {
    const next = selectedCuisines.includes(c)
      ? selectedCuisines.filter((x) => x !== c)
      : [...selectedCuisines, c]
    setSelectedCuisines(next)
    notify({ cuisines: next })
  }

  const clearAll = () => {
    setSelectedCuisines([])
    setPriceRange(0)
    setDeals(false)
    setFreeDelivery(false)
    setPickup(false)
    notify({ cuisines: [], priceRange: 0, deals: false, freeDelivery: false, pickup: false })
  }

  const hasFilters = selectedCuisines.length > 0 || priceRange > 0 || deals || freeDelivery || pickup

  return (
    <motion.aside
      initial={{ x: -16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 space-y-6 sticky top-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-medium"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Sort by</p>
        <div className="space-y-1">
          {(['rating', 'delivery_time', 'price'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => { setSortBy(opt); notify({ sortBy: opt }) }}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                sortBy === opt
                  ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {opt === 'rating' ? '⭐ Rating' : opt === 'delivery_time' ? '🕐 Delivery time' : '💰 Price'}
            </button>
          ))}
        </div>
      </div>

      {/* Quick filters */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Quick filters</p>
        <div className="space-y-2">
          {[
            { label: 'Deals & offers', icon: Tag, state: deals, set: (v: boolean) => { setDeals(v); notify({ deals: v }) } },
            { label: 'Free delivery', icon: Truck, state: freeDelivery, set: (v: boolean) => { setFreeDelivery(v); notify({ freeDelivery: v }) } },
            { label: 'Top rated (4.5+)', icon: Star, state: pickup, set: (v: boolean) => { setPickup(v); notify({ pickup: v }) } },
          ].map((f) => (
            <label
              key={f.label}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={f.state}
                onChange={(e) => f.set(e.target.checked)}
                className="rounded border-slate-300 text-orange-500 focus:ring-orange-400"
              />
              <f.icon className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-500 transition-colors" />
              <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Cuisines */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Cuisine</p>
        <div className="flex flex-wrap gap-1.5">
          {cuisineOptions.map((c) => (
            <button
              key={c}
              onClick={() => toggleCuisine(c)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCuisines.includes(c)
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Max delivery fee
        </p>
        <input
          type="range"
          min={0}
          max={3}
          value={priceRange}
          onChange={(e) => { setPriceRange(Number(e.target.value)); notify({ priceRange: Number(e.target.value) }) }}
          className="w-full accent-orange-500"
        />
        <p className="text-xs text-center text-slate-500 mt-1">
          {priceRange === 0 ? 'Any' : '$'.repeat(priceRange)}
        </p>
      </div>
    </motion.aside>
  )
}

