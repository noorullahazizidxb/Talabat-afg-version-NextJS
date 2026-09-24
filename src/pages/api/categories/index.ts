import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const categories = await prisma.category.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { _count: { select: { restaurants: true } } },
      })
      return res.status(200).json({ data: categories })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('[API /categories]', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
