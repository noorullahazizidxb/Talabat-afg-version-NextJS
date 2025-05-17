'use client'
import { useState } from 'react'
import { useLocationStore } from '@/store/locationStore'
import FiltersPanel from '@/components/FiltersPanel'
import RestaurantCard from '@/components/RestaurantCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const demoRestaurants = [
  { name: 'Vegan Burger', cuisine: 'Burgers, Vegan', time: '47 mins', fee: 'Free', rating: '4.8', logo: '/images/logo.png' },
  { name: 'Japanese Talk', cuisine: 'Sushi, Asian', time: '28 mins', fee: 'Free', rating: '4.9', logo: '/images/logo.png' },
  { name: 'Oregano', cuisine: 'Italian, Pizza', time: '37 mins', fee: 'Free', rating: '4.5', logo: '/images/logo.png' },
  { name: 'Spicy House', cuisine: 'Indian, Curry', time: '32 mins', fee: '$2.99', rating: '4.7', logo: '/images/logo.png' },
  { name: 'Fresh Salads', cuisine: 'Healthy, Salads', time: '25 mins', fee: 'Free', rating: '4.6', logo: '/images/logo.png' },
  { name: 'Burger King', cuisine: 'Fast Food, Burgers', time: '30 mins', fee: '$1.99', rating: '4.3', logo: '/images/logo.png' },
  { name: 'Pizza Hut', cuisine: 'Italian, Pizza', time: '35 mins', fee: '$2.49', rating: '4.4', logo: '/images/logo.png' }
]

export default function RestaurantPage() {
  const location = useLocationStore((s) => s.location)
  const [page, setPage] = useState(1)
  const perPage = 6
  const total = demoRestaurants.length
  const pages = Math.ceil(total / perPage)
  const currentItems = demoRestaurants.slice((page - 1) * perPage, page * perPage)

  return (
    <>
    <Header/>
    <div className="max-w-screen-xl mx-auto flex">
      <FiltersPanel />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-2">Delivery near {location}</h1>
        <div className="space-y-4">
          {currentItems.map((rest) => (
            <RestaurantCard key={rest.name} {...rest} />
          ))}
        </div>

        <div className="mt-6 flex gap-2 justify-center">
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="px-3 py-1 border rounded">« Prev</button>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-orange-500 text-white' : ''}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(p => p + 1)} disabled={page === pages} className="px-3 py-1 border rounded">Next »</button>
        </div>
      </main>
    </div>
<Footer/>
    </>
  )
}
