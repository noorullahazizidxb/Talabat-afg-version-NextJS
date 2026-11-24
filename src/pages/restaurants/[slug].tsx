'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Clock, Truck, MapPin, Plus, Minus,
  ShoppingCart, Search, Tag,
  Flame, ArrowLeft, ShoppingBag,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import { cn } from '@/utils/theme'
import { api, ApiRestaurant, ApiMenuCategory, ApiMenuItem } from '@/utils/api'
import { selectItemCount, useCartStore } from '@/store/cartStore'
import { countSwap, fadeUp, floatUp, press, revealViewport, spring, staggerContainer } from '@/utils/motion'
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
    <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--theme-text)]">
      <Star className="h-4 w-4 fill-[var(--theme-accent)] text-[var(--theme-accent)]" aria-hidden="true" />
      {rating.toFixed(1)}
      <span className="font-normal text-[var(--theme-text-muted)]">({count.toLocaleString()})</span>
    </span>
  )
}

function StatPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--theme-surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--theme-text)]">
      <Icon className="h-3.5 w-3.5 text-[var(--theme-primary)]" aria-hidden="true" />
      {label}
    </span>
  )
}

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-ring)]'

function MenuItemCard({ item, restaurantId }: { item: ApiMenuItem; restaurantId: string }) {
  const { addItem, updateItemQuantity, items } = useCartStore()
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

  const handleDecrement = () => {
    if (inCart) updateItemQuantity(inCart.id, inCart.quantity - 1)
  }

  return (
    <motion.li
      variants={fadeUp}
      className={cn(
        'flex gap-4 rounded-2xl border p-4 transition-[border-color,box-shadow] duration-200',
        'border-[var(--theme-border)] bg-[var(--theme-surface)] hover:shadow-md',
        inCart && 'border-orange-300 dark:border-orange-500/50',
        !item.isAvailable && 'pointer-events-none opacity-50'
      )}
    >
      <div className="min-w-0 flex-1">
        {item.isFeatured && (
          <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800 dark:bg-orange-500/15 dark:text-orange-300">
            <Flame className="h-3 w-3" aria-hidden="true" /> Popular
          </span>
        )}
        <h4 className="text-sm font-semibold text-[var(--theme-text)]">{item.name}</h4>
        {item.description && (
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[var(--theme-text-muted)]">{item.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-bold tabular-nums text-orange-700 dark:text-orange-300">
            AED {(item.discountPrice ?? item.price).toFixed(2)}
          </span>
          {item.discountPrice && (
            <span className="text-xs tabular-nums text-[var(--theme-text-muted)] line-through">
              AED {item.price.toFixed(2)}
            </span>
          )}
          {item.calories && (
            <span className="text-xs text-[var(--theme-text-muted)]">{item.calories} kcal</span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between gap-3">
        {item.imageUrl && (
          <div className="relative h-20 w-20 overflow-hidden rounded-xl">
            <Image src={item.imageUrl} alt="" fill className="object-cover" sizes="80px" />
          </div>
        )}
        <AnimatePresence mode="popLayout" initial={false}>
          {inCart ? (
            <motion.div
              key="stepper"
              variants={countSwap}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center rounded-full bg-orange-700 text-white shadow-sm"
            >
              <motion.button {...press} type="button" onClick={handleDecrement} aria-label={`Remove one ${item.name}`} className={cn('grid h-10 w-10 place-items-center rounded-full hover:bg-orange-800', focusRing)}>
                <Minus className="h-4 w-4" aria-hidden="true" />
              </motion.button>
              <span className="relative inline-grid w-5 justify-center overflow-hidden text-sm font-bold tabular-nums" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={inCart.quantity} variants={countSwap} initial="hidden" animate="visible" exit="exit">
                    {inCart.quantity}
                  </motion.span>
                </AnimatePresence>
              </span>
              <motion.button {...press} type="button" onClick={handleIncrement} aria-label={`Add one more ${item.name}`} className={cn('grid h-10 w-10 place-items-center rounded-full hover:bg-orange-800', focusRing)}>
                <Plus className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="add"
              {...press}
              variants={countSwap}
              initial="hidden"
              animate="visible"
              exit="exit"
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${item.name} to cart`}
              className={cn('flex h-10 items-center gap-1 rounded-full bg-orange-700 px-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-800', focusRing)}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
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
  const totalItems = useCartStore(selectItemCount)

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
          <div className="h-56 animate-pulse bg-[var(--theme-border)] motion-reduce:animate-none md:h-72" />
          <div className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-[var(--theme-border)] motion-reduce:animate-none" />
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
              {...press}
              type="button"
              onClick={() => router.back()}
              className="flex h-10 items-center gap-1.5 rounded-full bg-black/45 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
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
                <h1 className="truncate text-2xl font-extrabold tracking-tight text-white drop-shadow-md md:text-4xl">{displayRest.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={cn(
                    'text-xs font-semibold rounded-full px-2 py-0.5',
                    displayRest.isOpen
                      ? 'bg-emerald-500/25 text-emerald-100 border border-emerald-300/50'
                      : 'bg-red-500/25 text-red-100 border border-red-300/50'
                  )}>
                    {displayRest.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                  {displayRest.cuisines?.map(c => (
                    <span key={c.id} className="text-xs text-white/90">{c.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-b border-[var(--theme-border)] bg-[var(--theme-surface)]">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="-mx-4 flex items-center gap-3 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
              <RatingBadge rating={displayRest.rating} count={displayRest.reviewCount} />
              <div className="h-4 w-px shrink-0 bg-[var(--theme-border)]" aria-hidden="true" />
              <StatPill icon={Clock} label={`${displayRest.estimatedDeliveryTime} min`} />
              <StatPill
                icon={Truck}
                label={displayRest.deliveryFee === 0
                  ? 'Free delivery'
                  : `AED ${displayRest.deliveryFee} delivery`}
              />
              <StatPill icon={ShoppingBag} label={`Min AED ${displayRest.minOrderAmount}`} />
              {displayRest.acceptsCash && <StatPill icon={Tag} label="Cash accepted" />}
              <div className="flex shrink-0 items-center gap-1.5 text-xs text-[var(--theme-text-muted)]">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="truncate max-w-40">{displayRest.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-6">
          {/* Menu search */}
          <div className="relative mb-5">
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--theme-text-muted)]" aria-hidden="true" />
            <input
              id="menu-search"
              type="search"
              placeholder="Search the menu…"
              value={menuSearch}
              onChange={e => setMenuSearch(e.target.value)}
              className={cn(
                'h-12 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] pl-10 pr-4',
                'text-base text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--theme-ring)] focus:border-transparent',
                'transition-shadow'
              )}
            />
          </div>

          {/* Category tabs */}
          {menu.length > 1 && (
            <nav
              aria-label="Menu categories"
              className="sticky top-[61px] z-20 -mx-4 mb-6 border-b border-[var(--theme-border)] bg-[var(--theme-background)]/90 px-4 py-2 backdrop-blur-md"
            >
              <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
                {menu.map(cat => {
                  const active = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-current={active ? 'true' : undefined}
                      onClick={() => {
                        setActiveCategory(cat.id)
                        document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      className={cn(
                        'relative isolate h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors duration-200',
                        focusRing,
                        active
                          ? 'text-white'
                          : 'border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:border-orange-400 hover:text-[var(--theme-text)]'
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="menu-category-pill"
                          transition={spring.layout}
                          className="absolute inset-0 -z-10 rounded-full bg-orange-700 shadow-sm"
                        />
                      )}
                      {cat.name}
                    </button>
                  )
                })}
              </div>
            </nav>
          )}

          {/* Menu sections */}
          <div className="space-y-8">
            {filteredMenu.length === 0 ? (
              <div className="py-12 text-center text-[var(--theme-text-muted)]" role="status">
                <Search className="mx-auto mb-3 h-10 w-10 opacity-30" aria-hidden="true" />
                <p>No items match your search</p>
              </div>
            ) : (
              filteredMenu.map(cat => (
                <section key={cat.id} id={`cat-${cat.id}`} aria-labelledby={`cat-${cat.id}-title`} className="scroll-mt-32">
                  <h3 id={`cat-${cat.id}-title`} className="mb-3 flex items-baseline gap-2 text-lg font-bold text-[var(--theme-text)]">
                    {cat.name}
                    <span className="text-sm font-normal text-[var(--theme-text-muted)]">{cat.items.length}</span>
                  </h3>
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealViewport}
                    variants={staggerContainer(0.05)}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    {cat.items.map(item => (
                      <MenuItemCard key={item.id} item={item} restaurantId={displayRest.id} />
                    ))}
                  </motion.ul>
                </section>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            {...press}
            type="button"
            variants={floatUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setCartOpen(true)}
            className={cn(
              'fixed bottom-6 left-1/2 z-30 -translate-x-1/2',
              'flex h-12 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full px-6',
              'bg-orange-700 text-sm font-semibold text-white shadow-2xl shadow-orange-900/30 hover:bg-orange-800',
              focusRing
            )}
          >
            <ShoppingCart className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
            <span className="h-4 w-px bg-white/40" aria-hidden="true" />
            <span className="whitespace-nowrap">View Cart</span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  )
}
