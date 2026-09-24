import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { categoryId, limit = '20', page = '1' } = req.query

      const take = Math.min(Number(limit), 100)
      const skip = (Number(page) - 1) * take

      const where = categoryId ? { categoryId: Number(categoryId) } : {}

      const [restaurants, total] = await Promise.all([
        prisma.restaurant.findMany({
          where,
          take,
          skip,
          include: { category: { select: { slug: true, name: true } } },
          orderBy: { rating: 'desc' },
        }),
        prisma.restaurant.count({ where }),
      ])

      return res.status(200).json({
        data: restaurants,
        meta: { total, page: Number(page), limit: take },
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('[API /restaurants]', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
