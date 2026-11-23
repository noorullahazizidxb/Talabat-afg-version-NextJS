'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Clock, Truck, ChevronRight, MapPin, Plus, Minus,
  ShoppingCart, Search, Filter, ChevronDown, Tag,
  Flame, ArrowLeft, Info, ShoppingBag,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { cn } from '@/utils/theme'
import { api, ApiRestaurant, ApiMenuCategory, ApiMenuItem } from '@/utils/api'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/router'

// ─── Demo fallback data (shown when API is unavailable) ──────────────────────
const FALLBACK_MENU: ApiMenuCategory[] = [
  {
    id: '1', name: 'Popular', nameAr: 'الأكثر طلباً', sortOrder: 0,
    items: [
      { id: 'i1', name: 'Signature Burger', description: 'Double beef patty, cheddar, caramelised onion', price: 45, isAvailable: true, isFeatured: true, sortOrder: 0, addons: [] },
      { id: 'i2', name: 'Crispy Chicken Sandwich', description: 'Buttermilk fried chicken, pickles, sriracha mayo', price: 38, isAvailable: true, isFeatured: false, sortOrder: 1, addons: [] },
      { id: 'i3', name: 'Truffle Fries', description: 'Shoestring fries, truffle oil, parmesan, herbs', price: 25, isAvailable: true, isFeatured: true, sortOrder: 2, addons: [] },
    ],
  },
  {
    id: '2', name: 'Starters', sortOrder: 1,
    items: [
      { id: 'i4', name: 'Soup of the Day', description: 'Ask your server for today\'s selection', price: 20, isAvailable: true, isFeatured: false, sortOrder: 0, addons: [] },
      { id: 'i5', name: 'Garden Salad', description: 'Mixed greens, cherry tomatoes, cucumber, house vinaigrette', price: 28, isAvailable: true, isFeatured: false, sortOrder: 1, addons: [] },
    ],
  },
  {
    id: '3', name: 'Mains', sortOrder: 2,
    items: [
      { id: 'i6', name: 'Grilled Salmon', description: 'Atlantic salmon, lemon butter, seasonal vegetables', price: 75, discountPrice: 65, isAvailable: true, isFeatured: false, sortOrder: 0, addons: [] },
      { id: 'i7', name: 'Ribeye Steak 300g', description: '300g aged ribeye, chimichurri, roasted potatoes', price: 120, isAvailable: true, isFeatured: false, sortOrder: 1, addons: [] },
    ],
  },
  {
    id: '4', name: 'Desserts', sortOrder: 3,
    items: [
      { id: 'i8', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake, vanilla ice cream, berry coulis', price: 30, isAvailable: true, isFeatured: true, sortOrder: 0, addons: [] },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function RatingBadge({ rating, count }: { rating: number; count: number }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold text-[var(--theme-text)]">
      <Star className="h-4 w-4 fill-[var(--theme-accent)] text-[var(--theme-accent)]" />
      {rating.toFixed(1)}
      <span className="font-normal text-[var(--theme-text-muted)]">({count.toLocaleString()})</span>
    </span>
  )
}

function StatPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-[var(--theme-surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--theme-text)]">
      <Icon className="h-3.5 w-3.5 text-[var(--theme-primary)]" />
      {label}
    </span>
  )
}

function MenuItemCard({ item, restaurantId }: { item: ApiMenuItem; restaurantId: string }) {
  const { addItem, items } = useCartStore()
  const inCart = items.find(i => i.id === item.id)

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.discountPrice ?? item.price,
      quantity: 1,
      restaurantId,
      image: item.imageUrl,
    })
  }

  const handleIncrement = () => {
    if (inCart) addItem({ ...inCart, quantity: 1 })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex gap-4 rounded-xl p-4 transition-shadow hover:shadow-md',
        'bg-[var(--theme-surface)] border border-[var(--theme-border)]',
        !item.isAvailable && 'opacity-50 pointer-events-none'
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {item.isFeatured && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase tracking-wide">
              <Flame className="h-3 w-3" /> Popular
            </span>
          )}
        </div>
        <h4 className="font-semibold text-sm text-[var(--theme-text)] truncate">{item.name}</h4>
        {item.description && (
          <p className="text-xs text-[var(--theme-text-muted)] mt-0.5 line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-sm text-[var(--theme-primary)]">
            AED {(item.discountPrice ?? item.price).toFixed(2)}
          </span>
          {item.discountPrice && (
            <span className="text-xs line-through text-[var(--theme-text-muted)]">
              AED {item.price.toFixed(2)}
            </span>
          )}
          {item.calories && (
            <span className="text-xs text-[var(--theme-text-muted)]">{item.calories} kcal</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-3 shrink-0">
        {item.imageUrl && (
          <div className="relative h-20 w-20 overflow-hidden rounded-lg">
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center gap-1 rounded-full bg-[var(--theme-primary)] px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RestaurantDetailPage() {
  const router = useRouter()
  const { slug } = router.query as { slug: string }

  const [restaurant, setRestaurant] = useState<ApiRestaurant | null>(null)
  const [menu, setMenu] = useState<ApiMenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [menuSearch, setMenuSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const totalItems = useCartStore(s => s.totalItems)

  useEffect(() => {
    if (!slug) return
    setLoading(true)

    Promise.all([
      api.get<ApiRestaurant>(`/restaurants/${slug}`).catch(() => null),
      api.get<ApiMenuCategory[]>(`/restaurants/${slug}/menu`).catch(() => null),
    ]).then(([rest, m]) => {
      if (rest) setRestaurant(rest)
      const menuData = m ?? FALLBACK_MENU
      setMenu(menuData)
      setActiveCategory(menuData[0]?.id ?? '')
      setLoading(false)
    })
  }, [slug])

  const filteredMenu = menu.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      menuSearch === '' ||
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description?.toLowerCase().includes(menuSearch.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0)

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[var(--theme-background)]">
          <div className="h-64 animate-pulse bg-[var(--theme-border)]" />
          <div className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-[var(--theme-border)]" />
            ))}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const displayRest = restaurant ?? {
    id: slug, name: 'Restaurant', slug, rating: 4.7, reviewCount: 320,
    estimatedDeliveryTime: 30, deliveryFee: 0, freeDeliveryThreshold: 50,
    minOrderAmount: 20, isOpen: true, acceptsCash: true, acceptsCard: true,
    address: 'Dubai, UAE', lat: 0, lng: 0, preparationTime: 15, cuisines: [],
    area: { id: '', name: 'Dubai', slug: 'dubai', city: 'Dubai' },
  } as unknown as ApiRestaurant

  return (
    <>
      <Head>
        <title>{displayRest.name} — Talabat</title>
        <meta name="description" content={displayRest.description ?? `Order from ${displayRest.name} on Talabat`} />
      </Head>

      <Header />

      <div className="min-h-screen bg-[var(--theme-background)]">
        {/* Hero */}
        <div className="relative h-56 md:h-72 overflow-hidden bg-[var(--theme-surface-elevated)]">
          {displayRest.coverImageUrl ? (
            <Image src={displayRest.coverImageUrl} alt={displayRest.name} fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--theme-brand-start), var(--theme-brand-end))' }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5 text-sm text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </motion.button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end gap-4">
              {displayRest.logoUrl && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-lg">
                  <Image src={displayRest.logoUrl} alt={displayRest.name} fill className="object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-white drop-shadow-md truncate">{displayRest.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={cn(
                    'text-xs font-semibold rounded-full px-2 py-0.5',
                    displayRest.isOpen
                      ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  )}>
                    {displayRest.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                  {displayRest.cuisines?.map(c => (
                    <span key={c.id} className="text-xs text-white/80">{c.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="flex items-center gap-4 py-3 overflow-x-auto scrollbar-none">
              <RatingBadge rating={displayRest.rating} count={displayRest.reviewCount} />
              <div className="h-4 w-px bg-[var(--theme-border)]" />
              <StatPill icon={Clock} label={`${displayRest.estimatedDeliveryTime} min`} />
              <StatPill
                icon={Truck}
                label={displayRest.deliveryFee === 0
                  ? 'Free delivery'
                  : `AED ${displayRest.deliveryFee} delivery`}
              />
              <StatPill icon={ShoppingBag} label={`Min AED ${displayRest.minOrderAmount}`} />
              {displayRest.acceptsCash && <StatPill icon={Tag} label="Cash accepted" />}
              <div className="flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate max-w-40">{displayRest.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-6">
          {/* Menu search */}
          <div className="relative mb-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--theme-text-muted)]" />
            <input
              type="text"
              placeholder="Search the menu…"
              value={menuSearch}
              onChange={e => setMenuSearch(e.target.value)}
              className={cn(
                'w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] py-3 pl-10 pr-4',
                'text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-transparent',
                'transition-shadow'
              )}
            />
          </div>

          {/* Category tabs */}
          {menu.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-1">
              {menu.map(cat => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                    activeCategory === cat.id
                      ? 'bg-[var(--theme-primary)] text-white shadow-sm'
                      : 'bg-[var(--theme-surface)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]'
                  )}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>
          )}

          {/* Menu sections */}
          <div className="space-y-8">
            {filteredMenu.length === 0 ? (
              <div className="text-center py-12 text-[var(--theme-text-muted)]">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>No items match your search</p>
              </div>
            ) : (
              filteredMenu.map(cat => (
                <motion.section
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-[var(--theme-text)] mb-3 pb-2 border-b border-[var(--theme-border)]">
                    {cat.name}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {cat.items.map(item => (
                      <MenuItemCard key={item.id} item={item} restaurantId={displayRest.id} />
                    ))}
                  </div>
                </motion.section>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className={cn(
              'fixed bottom-6 left-1/2 -translate-x-1/2 z-30',
              'flex items-center gap-3 rounded-full px-6 py-3.5',
              'bg-[var(--theme-primary)] text-white shadow-2xl',
              'font-semibold text-sm'
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{totalItems} item{totalItems > 1 ? 's' : ''}</span>
            <span className="opacity-70">·</span>
            <span>View Cart</span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  )
}
