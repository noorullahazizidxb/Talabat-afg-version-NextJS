'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '../../utils/theme'

interface ResponsiveImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait' | 'wide'
  containerClassName?: string
  showLoadingIndicator?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  fallbackSrc,
  aspectRatio = 'auto',
  containerClassName,
  className,
  showLoadingIndicator = true,
  ...props
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const aspectRatioClasses = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {isLoading && showLoadingIndicator && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
          <span className="sr-only">Loading image</span>
        </div>
      )}

      <Image
        src={error && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
