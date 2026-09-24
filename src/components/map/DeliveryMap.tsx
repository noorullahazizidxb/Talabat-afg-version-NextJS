'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Marker {
  lat: number
  lng: number
  label?: string
  type?: 'restaurant' | 'user' | 'delivery'
}

interface DeliveryMapProps {
  /** Center coordinates */
  lat?: number
  lng?: number
  /** Zoom level 1–18 */
  zoom?: number
  markers?: Marker[]
  className?: string
  height?: string
  showControls?: boolean
  onLocationSelect?: (lat: number, lng: number) => void
}

/**
 * DeliveryMap — interactive OpenStreetMap via Leaflet CDN.
 * Dynamically loads Leaflet so it is SSR-safe.
 * This component lives in the PRESENTATION layer only; it has no direct
 * dependency on any infrastructure (API/DB) code. ✓ Dependency Rule.
 */
export function DeliveryMap({
  lat = 34.5254,   // Kabul, Afghanistan
  lng = 69.1783,
  zoom = 13,
  markers = [],
  className,
  height = '400px',
  showControls = true,
  onLocationSelect,
}: DeliveryMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<any>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || mapRef.current) return

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id  = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)
    }

    // Load Leaflet JS
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV/XN/WPeM='
    script.crossOrigin = ''

    script.onload = () => {
      try {
        const L = (window as any).L
        if (!containerRef.current || mapRef.current) return

        const map = L.map(containerRef.current, {
          zoomControl: false,
          attributionControl: true,
        }).setView([lat, lng], zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map)

        // Custom icon factory
        const makeIcon = (color: string, emoji: string) =>
          L.divIcon({
            className: '',
            html: `<div style="
              background:${color};
              border:2px solid white;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              width:32px;height:32px;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 8px rgba(0,0,0,.3)
            ">
              <span style="transform:rotate(45deg);font-size:14px">${emoji}</span>
            </div>`,
            iconSize:   [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -34],
          })

        const iconMap = {
          restaurant: makeIcon('#f97316', '🍽️'),
          user:       makeIcon('#3b82f6', '📍'),
          delivery:   makeIcon('#10b981', '🛵'),
        }

        // Add markers
        ;[{ lat, lng, type: 'user' as const, label: 'Your location' }, ...markers].forEach((m) => {
          const icon = iconMap[m.type ?? 'restaurant'] ?? iconMap.restaurant
          const marker = L.marker([m.lat, m.lng], { icon }).addTo(map)
          if (m.label) marker.bindPopup(`<b>${m.label}</b>`)
        })

        // Click-to-select
        if (onLocationSelect) {
          map.on('click', (e: any) => {
            onLocationSelect(e.latlng.lat, e.latlng.lng)
          })
        }

        mapRef.current = map
        setLoading(false)
      } catch (err) {
        setError('Failed to load map')
        setLoading(false)
      }
    }

    script.onerror = () => {
      setError('Could not load map resources. Check your connection.')
      setLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleZoom = (delta: number) => {
    mapRef.current?.setZoom(mapRef.current.getZoom() + delta)
  }

  const handleLocate = () => {
    mapRef.current?.setView([lat, lng], zoom)
  }

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl border border-border bg-muted', className)}
      style={{ height }}
      aria-label="Delivery area map"
      role="application"
    >
      {/* Map container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading skeleton */}
      {loading && (
        <div className="absolute inset-0 flex flex-col gap-3 p-4">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted text-center p-6">
          <MapPin className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{error}</p>
          {/* Iframe fallback */}
          <iframe
            title="Delivery area map"
            className="w-full h-48 rounded-lg border-0 mt-2"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02},${lat - 0.02},${lng + 0.02},${lat + 0.02}&layer=mapnik&marker=${lat},${lng}`}
            loading="lazy"
          />
        </div>
      )}

      {/* Custom zoom controls */}
      {showControls && !loading && !error && (
        <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-1">
          <button
            onClick={() => handleZoom(1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border shadow hover:bg-accent transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleZoom(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border shadow hover:bg-accent transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleLocate}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-background border border-border shadow hover:bg-accent transition-colors"
            aria-label="Reset view"
          >
            <Navigation className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
