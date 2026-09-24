'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Truck, Tag, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface FilterState {
  cuisines: string[]
  priceRange: number
  sortBy: 'rating' | 'delivery_time' | 'price'
  deals: boolean
  freeDelivery: boolean
  topRated: boolean
}

const CUISINE_OPTIONS = [
  '🍔 Burgers', '🍣 Sushi', '🍕 Pizza',
  '🥗 Salad',   '🍰 Dessert', '🌱 Vegan',
  '🍛 Indian',  '🍜 Asian',
]

const SORT_OPTIONS: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'rating',        label: '⭐ Rating' },
  { value: 'delivery_time', label: '🕐 Delivery time' },
  { value: 'price',         label: '💰 Price' },
]

interface FiltersPanelProps {
  onFilterChange?: (filters: FilterState) => void
}

export default function FiltersPanel({ onFilterChange }: FiltersPanelProps) {
  const [cuisines, setCuisines]         = useState<string[]>([])
  const [priceRange, setPriceRange]     = useState(0)
  const [sortBy, setSortBy]             = useState<FilterState['sortBy']>('rating')
  const [deals, setDeals]               = useState(false)
  const [freeDelivery, setFreeDelivery] = useState(false)
  const [topRated, setTopRated]         = useState(false)

  const notify = (partial: Partial<FilterState> = {}) => {
    onFilterChange?.({ cuisines, priceRange, sortBy, deals, freeDelivery, topRated, ...partial })
  }

  const toggle = (c: string) => {
    const next = cuisines.includes(c) ? cuisines.filter((x) => x !== c) : [...cuisines, c]
    setCuisines(next)
    notify({ cuisines: next })
  }

  const hasFilters = cuisines.length > 0 || priceRange > 0 || deals || freeDelivery || topRated

  const clearAll = () => {
    setCuisines([]); setPriceRange(0); setDeals(false); setFreeDelivery(false); setTopRated(false)
    notify({ cuisines: [], priceRange: 0, deals: false, freeDelivery: false, topRated: false })
  }

  return (
    <motion.aside initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
      className="bg-card text-card-foreground rounded-xl border border-border shadow-sm p-5 space-y-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filters
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 px-2 text-xs text-primary">
            <X className="h-3 w-3 mr-1" /> Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Sort by */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Sort by</p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((o) => (
            <button key={o.value} onClick={() => { setSortBy(o.value); notify({ sortBy: o.value }) }}
              className={cn(
                'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
                sortBy === o.value
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              )}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Quick filters */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Quick filters</p>
        <div className="space-y-2">
          {([
            { label: 'Deals & offers',  icon: Tag,   state: deals,       set: (v: boolean) => { setDeals(v);       notify({ deals: v }) } },
            { label: 'Free delivery',   icon: Truck, state: freeDelivery, set: (v: boolean) => { setFreeDelivery(v); notify({ freeDelivery: v }) } },
            { label: 'Top rated 4.5+', icon: Star,  state: topRated,    set: (v: boolean) => { setTopRated(v);    notify({ topRated: v }) } },
          ] as const).map((f) => (
            <label key={f.label} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={f.state} onChange={(e) => f.set(e.target.checked)}
                className="rounded border-border accent-primary" />
              <f.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Cuisine chips */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Cuisine</p>
        <div className="flex flex-wrap gap-1.5">
          {CUISINE_OPTIONS.map((c) => (
            <button key={c} onClick={() => toggle(c)}>
              <Badge variant={cuisines.includes(c) ? 'default' : 'muted'} className="cursor-pointer hover:opacity-80 transition-opacity text-xs">
                {c}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Max delivery fee
        </p>
        <input type="range" min={0} max={3} value={priceRange}
          onChange={(e) => { const v = Number(e.target.value); setPriceRange(v); notify({ priceRange: v }) }}
          className="w-full accent-primary" />
        <p className="text-xs text-center text-muted-foreground mt-1">
          {priceRange === 0 ? 'Any' : '$'.repeat(priceRange)}
        </p>
      </div>
    </motion.aside>
  )
}
