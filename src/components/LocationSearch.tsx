'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocationStore } from '@/store/locationStore'
import { motion } from 'framer-motion'

export default function LocationSearch() {
  const [input, setInput] = useState('')
  const setLocation = useLocationStore((s) => s.setLocation)
  const router = useRouter()

  const handleSearch = () => {
    if (input.trim()) {
      setLocation(input)
      router.push('/restaurants')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto flex mt-6 gap-2"
    >
      <input
        type="text"
        placeholder="Search for area, street name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border px-4 py-2 rounded"
      />
      <button onClick={handleSearch} className="bg-orange-500 px-4 py-2 text-white rounded">
        Let’s go
      </button>
    </motion.div>
  )
}
