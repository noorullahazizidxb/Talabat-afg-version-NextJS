'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export interface FilterState {
  cuisines: string[]
  priceRange: number
  sortBy: 'rating' | 'delivery_time' | 'price'
  deals: boolean
  freeDelivery: boolean
  pickup: boolean
}

export default function FiltersPanel({ 
  onFilterChange 
}: { 
  onFilterChange?: (filters: FilterState) => void 
}) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number>(0)
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('rating')
  const [deals, setDeals] = useState(false)
  const [freeDelivery, setFreeDelivery] = useState(false)
  const [pickup, setPickup] = useState(false)

  const cuisineOptions = [
    'Burgers', 'Sushi', 'Pizza', 'Salad', 'Dessert', 'Vegan'
  ]

  const handleFilterChange = () => {
    onFilterChange?.({ 
      cuisines: selectedCuisines, 
      priceRange, 
      sortBy, 
      deals, 
      freeDelivery, 
      pickup 
    })
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-60 p-4 border-r bg-white dark:bg-zinc-800 rounded-lg space-y-4 shadow-md"
    >
      <div>
        <h4 className="font-semibold mb-2 text-lg">Cuisines</h4>
        <div className="flex flex-wrap gap-2">
          {cuisineOptions.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => {
                const newCuisines = selectedCuisines.includes(cuisine)
                  ? selectedCuisines.filter(c => c !== cuisine)
                  : [...selectedCuisines, cuisine]
                setSelectedCuisines(newCuisines)
                handleFilterChange()
              }}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCuisines.includes(cuisine) 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-lg">Price Range</h4>
        <input 
          type="range" 
          min="0" 
          max="3" 
          value={priceRange} 
          onChange={(e) => {
            setPriceRange(Number(e.target.value))
            handleFilterChange()
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-sm text-gray-500 mt-2 text-center">
          {priceRange === 0 ? 'Any Price' : '$'.repeat(priceRange)}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-lg">Sort By</h4>
        <select 
          value={sortBy} 
          onChange={(e) => {
            setSortBy(e.target.value as FilterState['sortBy'])
            handleFilterChange()
          }}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-700"
        >
          <option value="rating">Rating</option>
          <option value="delivery_time">Delivery Time</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="space-y-2 text-sm">
        <h4 className="font-semibold mb-2 text-lg">Additional Filters</h4>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={deals}
            onChange={(e) => {
              setDeals(e.target.checked)
              handleFilterChange()
            }}
          /> Full menu deals
        </label>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={freeDelivery}
            onChange={(e) => {
              setFreeDelivery(e.target.checked)
              handleFilterChange()
            }}
          /> Free delivery
        </label>
        <label className="flex items-center">
          <input 
            type="checkbox" 
            className="mr-2" 
            checked={pickup}
            onChange={(e) => {
              setPickup(e.target.checked)
              handleFilterChange()
            }}
          /> Pickup
        </label>
      </div>
    </motion.aside>
  )
}
