'use client'

import { NextSeo, NextSeoProps } from 'next-seo'

interface SEOProps extends NextSeoProps {
  path?: string
}

export default function SEO({ 
  title, 
  description, 
  path = '', 
  openGraph, 
  ...props 
}: SEOProps) {
  // Base URL for the site
  const baseUrl = 'https://talabat.com'
  const url = path ? `${baseUrl}${path}` : baseUrl

  // Default image for social sharing
  const defaultOgImage = {
    url: `${baseUrl}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: 'Talabat - Food Delivery',
  }

  return (
    <NextSeo
      title={title}
      titleTemplate="%s | Talabat"
      defaultTitle="Talabat - Food Delivery"
      description={description || "Order food, groceries, and more from your favorite restaurants and shops."}
      canonical={url}
      openGraph={{
        type: 'website',
        locale: 'en_AE',
        url,
        siteName: 'Talabat',
        title: title || 'Talabat - Food Delivery',
        description: description || "Order food, groceries, and more from your favorite restaurants and shops.",
        images: openGraph?.images || [defaultOgImage],
        ...openGraph,
      }}
      twitter={{
        handle: '@talabat',
        site: '@talabat',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'application-name',
          content: 'Talabat',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#f97316',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/apple-touch-icon.png',
          sizes: '180x180',
        },
      ]}
      {...props}
    />
  )
}
