'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '../utils/theme'

interface SectionCardProps {
  title: string
  description: string
  image: string
  buttonText: string
  href: string
  index?: number
}

export default function SectionCard({ 
  title, 
  description, 
  image, 
  buttonText, 
  href,
  index = 0 
}: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 50
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-surface-light dark:bg-surface-dark",
        "rounded-2xl shadow-lg overflow-hidden",
        "border border-gray-100 dark:border-gray-800",
        "transform transition-all duration-300",
        "flex flex-col h-full"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          <Image 
            src={image} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.2 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-300 flex-grow"
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: (index * 0.1) + 0.4 }}
          viewport={{ once: true }}
          className="mt-4"
        >
          <Link href={href}>
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group inline-flex items-center gap-2",
                "px-4 py-2 rounded-lg", 
                "bg-accent-500 hover:bg-accent-600",
                "text-white font-medium",
                "transition-all duration-200"
              )}
            >
              {buttonText}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
