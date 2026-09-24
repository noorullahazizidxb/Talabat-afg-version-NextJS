'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocationStore } from '@/store/locationStore'
import { MapPin, ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface LocationSearchProps {
  className?: string
  placeholder?: string
  onSearch?: (location: string) => void
}

export default function LocationSearch({
  className,
  placeholder = 'Enter your area or street...',
  onSearch,
}: LocationSearchProps) {
  const [value, setValue]   = useState('')
  const [loading, setLoading] = useState(false)
  const setLocation = useLocationStore((s) => s.setLocation)
  const router = useRouter()

  const handleSearch = async () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setLoading(true)
    setLocation(trimmed)
    onSearch?.(trimmed)
    router.push('/restaurants')
  }

  return (
    <div className={cn('flex items-center gap-2 bg-white/95 dark:bg-background/95 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl shadow-black/10 border border-white/30', className)}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder={placeholder}
        startIcon={<MapPin className="h-4 w-4 text-primary" />}
        className="flex-1 border-0 shadow-none focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground h-10"
      />
      <Button
        onClick={handleSearch}
        disabled={!value.trim() || loading}
        isLoading={loading}
        size="pill"
        className="shrink-0 gap-2"
      >
        {!loading && (
          <>
            Find food
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}
