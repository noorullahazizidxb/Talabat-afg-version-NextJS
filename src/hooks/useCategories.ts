import { useEffect, useState, useCallback } from 'react'

export interface Category {
  id: number
  slug: string
  name: string
  icon?: string
  image?: string
  _count?: { restaurants: number }
}

/**
 * Application-layer hook — fetches categories from the API.
 * Presentation depends on this; this does NOT depend on UI. ✓ Dependency Rule.
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [tick, setTick]             = useState(0)

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch('/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(({ data }) => {
        if (!cancelled) setCategories(data ?? [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [tick])

  return { categories, loading, error, refetch }
}
