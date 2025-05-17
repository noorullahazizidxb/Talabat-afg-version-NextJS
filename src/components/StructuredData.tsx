'use client'

import { useMemo } from 'react'

interface StructuredDataProps {
  type: 'Restaurant' | 'Product' | 'Organization' | 'LocalBusiness' | 'WebSite' | string
  data: Record<string, any>
}

/**
 * Component to add structured data (JSON-LD) to pages for SEO and rich search results
 */
export default function StructuredData({ type, data }: StructuredDataProps) {
  const jsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    }
  }, [type, data])

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * Helper for restaurant structured data
 */
export function RestaurantStructuredData({
  name,
  image,
  description,
  address,
  priceRange,
  telephone,
  servesCuisine,
  menu,
  rating,
  reviewCount,
}: {
  name: string
  image: string | string[]
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion?: string
    postalCode?: string
    addressCountry: string
  }
  priceRange: string
  telephone?: string
  servesCuisine?: string | string[]
  menu?: string
  rating?: number
  reviewCount?: number
}) {
  const data = {
    name,
    image: Array.isArray(image) ? image : [image],
    description,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    priceRange,
    ...(telephone && { telephone }),
    ...(servesCuisine && { servesCuisine }),
    ...(menu && { menu }),
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewCount || 0,
      },
    }),
  }

  return <StructuredData type="Restaurant" data={data} />
}

/**
 * Helper for organization structured data
 */
export function OrganizationStructuredData({
  name,
  logo,
  url,
  description,
  socialProfiles,
}: {
  name: string
  logo: string
  url: string
  description: string
  socialProfiles?: string[]
}) {
  const data = {
    name,
    logo,
    url,
    description,
    ...(socialProfiles && { sameAs: socialProfiles }),
  }

  return <StructuredData type="Organization" data={data} />
}
