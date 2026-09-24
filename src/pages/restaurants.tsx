'use client'
import { useState } from 'react'
import { useLocationStore } from '@/store/locationStore'
import FiltersPanel from '@/components/FiltersPanel'
import RestaurantCard from '@/components/RestaurantCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'

const demoRestaurants = [
  { name: 'Vegan Burger',    cuisine: 'Burgers, Vegan',   time: '47 mins', fee: 'Free', rating: '4.8', logo: '/images/logo.png' },
  { name: 'Japanese Talk',   cuisine: 'Sushi, Asian',     time: '28 mins', fee: 'Free', rating: '4.9', logo: '/images/logo.png' },
  { name: 'Oregano',         cuisine: 'Italian, Pizza',   time: '37 mins', fee: 'Free', rating: '4.5', logo: '/images/logo.png' },
  { name: 'Spicy House',     cuisine: 'Indian, Curry',    time: '32 mins', fee: '$2.99', rating: '4.7', logo: '/images/logo.png' },
  { name: 'Fresh Salads',    cuisine: 'Healthy, Salads',  time: '25 mins', fee: 'Free', rating: '4.6', logo: '/images/logo.png' },
  { name: 'Burger King',     cuisine: 'Fast Food, Burgers', time: '30 mins', fee: '$1.99', rating: '4.3', logo: '/images/logo.png' },
  { name: 'Pizza Hut',       cuisine: 'Italian, Pizza',   time: '35 mins', fee: '$2.49', rating: '4.4', logo: '/images/logo.png' },
]

export default function RestaurantPage() {
  const location = useLocationStore((s) => s.location)
  const [page, setPage] = useState(1)
  const [mobileFilters, setMobileFilters] = useState(false)
  const perPage = 6
  const total = demoRestaurants.length
  const pages = Math.ceil(total / perPage)
  const currentItems = demoRestaurants.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Delivery near{' '}
                <span className="text-orange-500">{location || 'your area'}</span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {total} restaurants found
              </p>
            </div>
            <button
              onClick={() => setMobileFilters(!mobileFilters)}
              className="md:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className="flex gap-6">
            {/* Sidebar filters */}
            <div className={`${mobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
              <FiltersPanel />
            </div>

            {/* Restaurant list */}
            <main className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentItems.map((rest, i) => (
                  <motion.div
                    key={rest.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <RestaurantCard {...rest} index={i} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-8 flex gap-2 justify-center">
                  <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                        page === i + 1
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === pages}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

