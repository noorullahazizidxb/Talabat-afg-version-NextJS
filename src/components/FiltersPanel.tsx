'use client'

import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownAZ, Clock, RotateCcw, Star, Truck, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/theme'
import { spring } from '@/utils/motion'

export type SortKey = 'rating' | 'deliveryTime' | 'deliveryFee' | 'name'

export interface RestaurantFilters {
  cuisineSlug: string
  freeDelivery: boolean
  openNow: boolean
  sortBy: SortKey
}

export const DEFAULT_FILTERS: RestaurantFilters = { cuisineSlug: '', freeDelivery: false, openNow: false, sortBy: 'rating' }

export const countActiveFilters = (filters: RestaurantFilters) =>
  [filters.cuisineSlug !== '', filters.freeDelivery, filters.openNow, filters.sortBy !== DEFAULT_FILTERS.sortBy].filter(Boolean)
    .length

const SORT_OPTIONS: { key: SortKey; label: string; icon: LucideIcon }[] = [
  { key: 'rating', label: 'Rating', icon: Star },
  { key: 'deliveryTime', label: 'Fastest', icon: Clock },
  { key: 'deliveryFee', label: 'Cheapest delivery', icon: Truck },
  { key: 'name', label: 'Name', icon: ArrowDownAZ },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-ring)]'

interface FilterChipProps {
  active: boolean
  /** Chips sharing a group id slide one highlight between them. */
  group: string
  onClick: () => void
  children: ReactNode
}

/** Toggle chip whose active background glides between siblings of the same group. */
export function FilterChip({ active, group, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'relative isolate inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors duration-200',
        focusRing,
        active
          ? 'text-white'
          : 'border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:border-orange-400 hover:text-[var(--theme-text)]'
      )}
    >
      {active && (
        <motion.span
          layoutId={`${group}-chip`}
          transition={spring.layout}
          className="absolute inset-0 -z-10 rounded-full bg-orange-700 shadow-sm shadow-orange-900/20"
        />
      )}
      {children}
    </button>
  )
}

interface FiltersPanelProps {
  id: string
  open: boolean
  filters: RestaurantFilters
  onChange: <K extends keyof RestaurantFilters>(key: K, value: RestaurantFilters[K]) => void
  onReset: () => void
}

/** Collapsible sort + toggle filters for the restaurant listing. */
export default function FiltersPanel({ id, open, filters, onChange, onReset }: FiltersPanelProps) {
  const toggles: { key: 'freeDelivery' | 'openNow'; label: string }[] = [
    { key: 'freeDelivery', label: 'Free delivery' },
    { key: 'openNow', label: 'Open now' },
  ]

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={spring.panel}
          className="overflow-hidden border-b border-[var(--theme-border)] bg-[var(--theme-surface)]"
        >
          <div className="container mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div role="group" aria-label="Sort by" className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-[var(--theme-text-muted)]">Sort:</span>
                {SORT_OPTIONS.map(({ key, label, icon: Icon }) => (
                  <FilterChip key={key} group="sort" active={filters.sortBy === key} onClick={() => onChange('sortBy', key)}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </FilterChip>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {toggles.map(({ key, label }) => (
                  <label key={key} className="flex min-h-10 cursor-pointer items-center gap-2 text-sm text-[var(--theme-text)]">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={e => onChange(key, e.target.checked)}
                      className="h-4 w-4 accent-orange-600"
                    />
                    {label}
                  </label>
                ))}
              </div>
              <AnimatePresence>
                {countActiveFilters(filters) > 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileTap={{ scale: 0.96 }}
                    transition={spring.snappy}
                    onClick={onReset}
                    className={cn(
                      'ml-auto flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-[var(--theme-danger)] hover:bg-red-500/10',
                      focusRing
                    )}
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Reset
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
