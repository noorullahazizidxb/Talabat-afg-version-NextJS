'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { selectItemCount, useCartStore, type CartItem } from '@/store/cartStore'
import { cn } from '@/utils/theme'
import { countSwap, drawer, fadeIn, listItem, press, spring } from '@/utils/motion'

const FREE_DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 5

const lineTotal = (item: CartItem) =>
  (item.price + (item.options?.reduce((sum, option) => sum + option.price, 0) ?? 0)) * item.quantity

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-ring)]'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

function AnimatedCount({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('relative inline-grid overflow-hidden tabular-nums', className)} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} variants={countSwap} initial="hidden" animate="visible" exit="exit">
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateItemQuantity, removeItem, clearCart } = useCartStore()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const totalItems = useCartStore(selectItemCount)
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0)
  const deliveryFee = subtotal > FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  const freeDeliveryProgress = Math.min(subtotal / FREE_DELIVERY_THRESHOLD, 1)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="drawer"
            variants={drawer}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className={cn(
              'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col shadow-2xl',
              'border-l border-[var(--theme-border)] bg-[var(--theme-surface)]'
            )}
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--theme-border)] px-5 py-3">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="h-5 w-5 text-[var(--theme-primary)]" aria-hidden="true" />
                <h2 id="cart-drawer-title" className="flex items-center gap-2 text-lg font-semibold text-[var(--theme-text)]">
                  Your Cart
                  {totalItems > 0 && (
                    <span className="rounded-full bg-orange-700 px-2 py-0.5 text-xs font-bold text-white">
                      <AnimatedCount value={totalItems} />
                      <span className="sr-only"> items</span>
                    </span>
                  )}
                </h2>
              </div>
              <div className="flex items-center gap-1">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className={cn(
                      'h-10 rounded-full px-3 text-xs font-medium text-[var(--theme-text-muted)] transition-colors hover:text-[var(--theme-danger)]',
                      focusRing
                    )}
                  >
                    Clear all
                  </button>
                )}
                <motion.button
                  {...press}
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close cart"
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-full text-[var(--theme-text-muted)] transition-colors hover:bg-[var(--theme-surface-elevated)] hover:text-[var(--theme-text)]',
                    focusRing
                  )}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-4">
              {items.length === 0 ? (
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="flex h-full flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="rounded-full bg-[var(--theme-surface-elevated)] p-6">
                    <ShoppingBag className="h-10 w-10 text-[var(--theme-text-muted)]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--theme-text)]">Your cart is empty</p>
                    <p className="mt-1 text-sm text-[var(--theme-text-muted)]">Add items from a restaurant to get started</p>
                  </div>
                  <motion.button
                    {...press}
                    type="button"
                    onClick={onClose}
                    className={cn('h-11 rounded-xl bg-orange-700 px-6 text-sm font-semibold text-white hover:bg-orange-800', focusRing)}
                  >
                    Browse Restaurants
                  </motion.button>
                </motion.div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {items.map(item => (
                      <motion.li
                        key={item.id}
                        layout
                        variants={listItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={spring.layout}
                        className="flex gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] p-3"
                      >
                        {item.image && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[var(--theme-text)]">{item.name}</p>
                          {item.options && item.options.length > 0 && (
                            <p className="mt-0.5 truncate text-xs text-[var(--theme-text-muted)]">
                              {item.options.map(o => o.name).join(', ')}
                            </p>
                          )}
                          <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--theme-text)]">
                            AED {lineTotal(item).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-between gap-1">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className={cn(
                              '-mr-2 -mt-2 grid h-10 w-10 place-items-center rounded-full text-[var(--theme-text-muted)] transition-colors hover:text-[var(--theme-danger)]',
                              focusRing
                            )}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <div className="flex items-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)]">
                            <motion.button
                              {...press}
                              type="button"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease ${item.name} quantity`}
                              className={cn(
                                'grid h-10 w-10 place-items-center rounded-full text-[var(--theme-text)] transition-colors hover:text-[var(--theme-primary)]',
                                focusRing
                              )}
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                            </motion.button>
                            <AnimatedCount value={item.quantity} className="w-5 justify-center text-sm font-semibold text-[var(--theme-text)]" />
                            <motion.button
                              {...press}
                              type="button"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className={cn(
                                'grid h-10 w-10 place-items-center rounded-full text-[var(--theme-text)] transition-colors hover:text-[var(--theme-primary)]',
                                focusRing
                              )}
                            >
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-[var(--theme-border)] px-5 py-4">
                <div>
                  <p className="mb-1.5 text-xs text-[var(--theme-text-muted)]">
                    {deliveryFee === 0
                      ? 'You’ve unlocked free delivery'
                      : subtotal < FREE_DELIVERY_THRESHOLD
                        ? `Add AED ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for free delivery`
                        : `Free delivery on orders over AED ${FREE_DELIVERY_THRESHOLD}`}
                  </p>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-[var(--theme-surface-elevated)]"
                    role="progressbar"
                    aria-label="Progress to free delivery"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(freeDeliveryProgress * 100)}
                  >
                    <motion.div
                      className="h-full origin-left rounded-full bg-[var(--theme-success)]"
                      initial={false}
                      animate={{ scaleX: freeDeliveryProgress }}
                      transition={spring.panel}
                    />
                  </div>
                </div>

                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between text-[var(--theme-text-muted)]">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">AED {subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-[var(--theme-text-muted)]">
                    <dt>Delivery</dt>
                    <dd className={cn('tabular-nums', deliveryFee === 0 && 'font-medium text-[var(--theme-success)]')}>
                      {deliveryFee === 0 ? 'Free' : `AED ${deliveryFee.toFixed(2)}`}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-[var(--theme-border)] pt-2 text-base font-semibold text-[var(--theme-text)]">
                    <dt>Total</dt>
                    <dd className="tabular-nums">AED {total.toFixed(2)}</dd>
                  </div>
                </dl>

                <motion.div {...press} whileHover={{ y: -1 }}>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className={cn(
                      'flex min-h-12 items-center justify-between rounded-xl bg-orange-700 px-5 text-white shadow-lg shadow-orange-900/20 transition-colors hover:bg-orange-800',
                      focusRing
                    )}
                  >
                    <span className="font-semibold">Checkout</span>
                    <span className="flex items-center gap-2 font-semibold tabular-nums">
                      AED {total.toFixed(2)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
