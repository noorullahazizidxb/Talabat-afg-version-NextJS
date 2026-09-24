'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FiltersPanel, { FilterState } from '@/components/FiltersPanel'
import RestaurantCard, { RestaurantCardSkeleton } from '@/components/RestaurantCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useLocationStore } from '@/store/locationStore'

const DeliveryMap = dynamic(
  () => import('@/components/map/DeliveryMap').then((m) => m.DeliveryMap),
  { ssr: false, loading: () => <div className="h-48 rounded-xl bg-muted animate-pulse" /> }
)

// Demo data — replaced by useRestaurants() once Prisma is seeded
const DEMO = [
  { name: 'Vegan Burger',  cuisine: 'Burgers, Vegan',     time: '47 mins', fee: 'Free', rating: '4.8', logo: '/images/logo.png' },
  { name: 'Japanese Talk', cuisine: 'Sushi, Asian',        time: '28 mins', fee: 'Free', rating: '4.9', logo: '/images/logo.png' },
  { name: 'Oregano',       cuisine: 'Italian, Pizza',      time: '37 mins', fee: 'Free', rating: '4.5', logo: '/images/logo.png' },
  { name: 'Spicy House',   cuisine: 'Indian, Curry',       time: '32 mins', fee: '$2.99', rating: '4.7', logo: '/images/logo.png' },
  { name: 'Fresh Salads',  cuisine: 'Healthy, Salads',     time: '25 mins', fee: 'Free', rating: '4.6', logo: '/images/logo.png' },
  { name: 'Burger King',   cuisine: 'Fast Food, Burgers',  time: '30 mins', fee: '$1.99', rating: '4.3', logo: '/images/logo.png' },
  { name: 'Pizza Hut',     cuisine: 'Italian, Pizza',      time: '35 mins', fee: '$2.49', rating: '4.4', logo: '/images/logo.png' },
]

const PER_PAGE = 6

export default function RestaurantsPage() {
  const location = useLocationStore((s) => s.location)
  const [page, setPage]               = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters]         = useState<FilterState | null>(null)

  const total = DEMO.length
  const pages = Math.ceil(total / PER_PAGE)
  const items = DEMO.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Delivery near{' '}
              <span className="text-primary">{location || 'your area'}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <Badge variant="secondary">{total} restaurants</Badge> available now
            </p>
          </div>
          <Button variant="outline" size="sm" className="md:hidden gap-2"
            onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
            <FiltersPanel onFilterChange={setFilters} />
          </div>

          {/* Restaurant list */}
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((r, i) => (
                <motion.div key={r.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <RestaurantCard {...r} index={i} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>← Prev</Button>
                {Array.from({ length: pages }, (_, i) => (
                  <Button key={i} variant={page === i + 1 ? 'default' : 'outline'} size="sm"
                    onClick={() => setPage(i + 1)}>{i + 1}</Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === pages}>Next →</Button>
              </div>
            )}

            {/* Mini map below results */}
            <Separator className="my-8" />
            <div>
              <h2 className="text-lg font-semibold mb-3 text-foreground">Restaurants near you</h2>
              <DeliveryMap lat={34.5254} lng={69.1783} zoom={14} height="280px"
                markers={[
                  { lat: 34.528, lng: 69.175, label: 'Vegan Burger',  type: 'restaurant' },
                  { lat: 34.524, lng: 69.185, label: 'Japanese Talk', type: 'restaurant' },
                  { lat: 34.521, lng: 69.170, label: 'Spicy House',   type: 'restaurant' },
                ]} />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
