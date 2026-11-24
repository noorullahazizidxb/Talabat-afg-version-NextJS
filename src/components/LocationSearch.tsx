'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import { useLocationStore } from '@/store/locationStore'

export default function LocationSearch() {
  const [input, setInput] = useState('')
  const setLocation = useLocationStore((s) => s.setLocation)
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const location = input.trim()
    if (!location) return
    setLocation(location)
    router.push('/restaurants')
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-lg shadow-orange-900/20 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-white/80"
    >
      <MapPin className="h-5 w-5 shrink-0 text-orange-500" aria-hidden="true" />
      <label htmlFor="location-search" className="sr-only">
        Your area or street
      </label>
      <input
        id="location-search"
        type="text"
        inputMode="search"
        autoComplete="street-address"
        placeholder="Search for area, street name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-w-0 flex-1 bg-transparent py-2 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-gray-900 px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-gray-800 sm:px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:scale-[0.98] motion-reduce:transition-none"
      >
        Let’s go
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  )
}
