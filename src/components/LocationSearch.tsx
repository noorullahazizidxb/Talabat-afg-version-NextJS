'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocationStore } from '@/store/locationStore'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Loader2 } from 'lucide-react'

export default function LocationSearch() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const setLocation = useLocationStore((s) => s.setLocation)
  const router = useRouter()

  const handleSearch = () => {
    if (!input.trim()) return
    setLoading(true)
    setLocation(input.trim())
    router.push('/restaurants')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl shadow-black/10">
        <div className="flex items-center flex-1 gap-2 pl-3">
          <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
          <input
            type="text"
            placeholder="Enter your area or street…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 py-2.5 text-slate-800 text-sm bg-transparent outline-none placeholder-slate-400"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSearch}
          disabled={!input.trim() || loading}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Find food
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

