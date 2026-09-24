import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'food' },
      update: {},
      create: { slug: 'food', name: 'Food', icon: '🍔', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'groceries' },
      update: {},
      create: { slug: 'groceries', name: 'Groceries', icon: '🛒', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'flowers' },
      update: {},
      create: { slug: 'flowers', name: 'Flowers', icon: '🌸', sortOrder: 3 },
    }),
  ])

  // Sample restaurants
  const restaurantData = [
    {
      slug: 'vegan-burger',
      name: 'Vegan Burger',
      description: 'Delicious plant-based burgers',
      cuisine: 'Burgers, Vegan',
      rating: 4.8,
      reviewCount: 320,
      deliveryMin: 47,
      deliveryFee: 0,
      minOrder: 10,
      categoryId: categories[0].id,
    },
    {
      slug: 'japanese-talk',
      name: 'Japanese Talk',
      description: 'Authentic Japanese sushi and ramen',
      cuisine: 'Sushi, Asian',
      rating: 4.9,
      reviewCount: 512,
      deliveryMin: 28,
      deliveryFee: 0,
      minOrder: 15,
      categoryId: categories[0].id,
    },
    {
      slug: 'oregano',
      name: 'Oregano',
      description: 'Classic Italian cuisine',
      cuisine: 'Italian, Pizza',
      rating: 4.5,
      reviewCount: 208,
      deliveryMin: 37,
      deliveryFee: 0,
      minOrder: 12,
      categoryId: categories[0].id,
    },
    {
      slug: 'spicy-house',
      name: 'Spicy House',
      description: 'Authentic Indian curries and spices',
      cuisine: 'Indian, Curry',
      rating: 4.7,
      reviewCount: 405,
      deliveryMin: 32,
      deliveryFee: 2.99,
      minOrder: 10,
      categoryId: categories[0].id,
    },
    {
      slug: 'fresh-salads',
      name: 'Fresh Salads',
      description: 'Healthy, fresh salads made to order',
      cuisine: 'Healthy, Salads',
      rating: 4.6,
      reviewCount: 189,
      deliveryMin: 25,
      deliveryFee: 0,
      minOrder: 8,
      categoryId: categories[0].id,
    },
  ]

  for (const data of restaurantData) {
    await prisma.restaurant.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    })
  }

  console.log('✅ Database seeded successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
