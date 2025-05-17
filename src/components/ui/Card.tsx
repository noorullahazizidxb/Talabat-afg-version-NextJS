'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/theme'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/* Card Container */
interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  variant?: 'default' | 'outline' | 'ghost'
  isHoverable?: boolean
  isInteractive?: boolean
  index?: number
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', isHoverable = false, isInteractive = false, index = 0, children, ...props }, ref) => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = useReducedMotion()

    const baseStyles = cn(
      'rounded-xl overflow-hidden',
      'transition-all duration-300',
      {
        'bg-white dark:bg-gray-800 shadow-sm': variant === 'default',
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700': variant === 'outline',
        'bg-gray-50 dark:bg-gray-900': variant === 'ghost',
        'hover:shadow-md transform hover:-translate-y-1': isHoverable && !prefersReducedMotion,
        'cursor-pointer': isInteractive,
      },
      className
    )

    // Handle animations based on reduced motion preference
    if (prefersReducedMotion) {
      return (
        <div
          ref={ref}
          className={baseStyles}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        className={baseStyles}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          type: 'spring',
          stiffness: 50
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = 'Card'

/* Card Header */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 pb-0 space-y-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardHeader.displayName = 'CardHeader'

/* Card Title */
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-xl font-semibold text-gray-900 dark:text-gray-100', className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)
CardTitle.displayName = 'CardTitle'

/* Card Description */
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-gray-600 dark:text-gray-300', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
CardDescription.displayName = 'CardDescription'

/* Card Content */
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardContent.displayName = 'CardContent'

/* Card Footer */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 pt-0 flex items-center', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardFooter.displayName = 'CardFooter'

/* Card Image */
interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide'
  overlay?: boolean
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspectRatio = 'auto', overlay = false, alt = '', ...props }, ref) => {
    const imgWrapperClasses = cn(
      'relative overflow-hidden w-full',
      {
        'aspect-square': aspectRatio === 'square',
        'aspect-video': aspectRatio === 'video',
        'aspect-[16/9]': aspectRatio === 'wide',
      },
      className
    )

    return (
      <div ref={ref} className={imgWrapperClasses}>
        <img 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          alt={alt}
          {...props}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        )}
      </div>
    )
  }
)
CardImage.displayName = 'CardImage'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage }
