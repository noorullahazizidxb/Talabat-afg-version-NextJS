'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbsProps {
  segments?: string[]
}

export default function Breadcrumbs({ segments: propSegments }: BreadcrumbsProps = {}) {
  const pathname = usePathname()
  const segments = propSegments || (pathname ? pathname.split('/').filter(Boolean) : [])

  if (segments.length === 0) return null

  let href = ''

  return (
    <nav className="text-sm text-gray-500 dark:text-gray-300 mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {segments.map((seg, i) => {
          href += '/' + seg
          const label = seg.replace(/-/g, ' ')
          return (
            <li key={i} className="flex items-center space-x-2">
              <span>/</span>
              <Link href={href} className="hover:underline capitalize">{label}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
