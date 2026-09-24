import { useEffect, useState, useCallback } from 'react'

export interface Restaurant {
  id: number
  slug: string
  name: string
  cuisine?: string
  logo?: string
  coverImage?: string
  rating: number
  reviewCount: number
  deliveryMin: number
  deliveryFee: number
  isOpen: boolean
  category?: { slug: string; name: string } | null
}

export interface RestaurantListParams {
  categoryId?: number
  page?: number
  limit?: number
}

export interface RestaurantListResult {
  restaurants: Restaurant[]
  total: number
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Data-fetching hook — application layer.
 * Presentation components depend on this; this does NOT depend on
 * any presentation code. ✓ Dependency Rule.
 */
export function useRestaurants(params: RestaurantListParams = {}): RestaurantListResult {
  const { categoryId, page = 1, limit = 20 } = params
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [total, setTotal]             = useState(0)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)
  const [tick, setTick]               = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const url = new URL('/api/restaurants', window.location.origin)
    url.searchParams.set('page', String(page))
    url.searchParams.set('limit', String(limit))
    if (categoryId) url.searchParams.set('categoryId', String(categoryId))

    fetch(url.toString())
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(({ data, meta }) => {
        if (!cancelled) {
          setRestaurants(data ?? [])
          setTotal(meta?.total ?? 0)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [categoryId, page, limit, tick])

  return { restaurants, total, loading, error, refetch }
}
