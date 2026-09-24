'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Clock, Truck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface RestaurantCardData {
  name: string
  cuisine?: string
  /** Delivery time as string ("30 mins") or number (30) */
  time: string | number
  fee: string | number
  rating: string | number
  logo: string
  href?: string
  index?: number
  featured?: boolean
  coverImage?: string
  isOpen?: boolean
}

export function RestaurantCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-28 w-full" />
      <CardContent className="p-4 flex gap-3">
        <Skeleton className="h-14 w-14 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function RestaurantCard({
  name, cuisine, time, fee, rating, logo, href = '#',
  index = 0, featured = false, coverImage, isOpen = true,
}: RestaurantCardData) {
  const ratingNum = parseFloat(String(rating)) || 0
  const feeStr    = fee === 'Free' || fee === 0 || fee === '$0' ? 'Free' : String(fee)

  return (
    <Card className={cn(
      'overflow-hidden group transition-all duration-300',
      'hover:shadow-lg hover:-translate-y-0.5',
      featured && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
      !isOpen && 'opacity-60'
    )}>
      <Link href={href} className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
        {/* Cover image */}
        {coverImage ? (
          <div className="relative h-28 overflow-hidden">
            <Image src={coverImage} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          </div>
        ) : (
          <div className="h-2 bg-gradient-to-r from-primary/80 to-orange-400" />
        )}

        <CardContent className="p-4 flex gap-3">
          {/* Logo */}
          <div className={cn(
            'relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 border-background shadow-md',
            coverImage && '-mt-7'
          )}>
            <Image src={logo} alt={name} fill className="object-cover" />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {name}
              </h3>
              {featured && <Badge variant="default" className="shrink-0 text-[10px]">TOP</Badge>}
              {!isOpen && <Badge variant="secondary" className="shrink-0 text-[10px]">Closed</Badge>}
            </div>

            {cuisine && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{cuisine}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs font-medium">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                {ratingNum.toFixed(1)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {typeof time === 'number' ? `${time} min` : time}
              </span>
              <span className="flex items-center gap-1 text-xs">
                <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                {feeStr === 'Free'
                  ? <span className="text-success font-medium">Free delivery</span>
                  : <span className="text-muted-foreground">{feeStr}</span>
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
