'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { fadeUp, lift } from '@/utils/motion'

export interface SectionCardProps {
  title: string
  description: string
  image: string
  icon: LucideIcon
  href: string
  buttonText: string
}

/**
 * Service tile (food, groceries, flowers…). Renders an `<li>` driven by the
 * parent's `hidden`/`visible` variants, so place it inside a staggered `<motion.ul>`.
 */
export default function SectionCard({ title, description, image, icon: Icon, href, buttonText }: SectionCardProps) {
  return (
    <motion.li variants={fadeUp} className="h-full">
      <motion.div {...lift} className="h-full">
        <Link
          href={href}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-900/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-black/40"
        >
          <div className="relative aspect-[5/3] overflow-hidden">
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
            <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-orange-500 text-white shadow-md dark:bg-orange-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-1.5 text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mb-5 text-pretty text-sm leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
            <span className="mt-auto inline-flex h-10 w-fit items-center gap-2 rounded-full bg-orange-700 px-4 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-orange-800">
              {buttonText}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.li>
  )
}
