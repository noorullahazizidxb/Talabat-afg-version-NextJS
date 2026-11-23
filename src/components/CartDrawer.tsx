'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/utils/theme'

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, subtotal, updateItemQuantity, removeItem, clearCart } = useCartStore()

  const deliveryFee = subtotal > 50 ? 0 : 5
  const total = subtotal + deliveryFee

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col',
              'shadow-2xl',
              'bg-[var(--theme-surface)]',
              'border-l border-[var(--theme-border)]'
            )}
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--theme-border)] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="h-5 w-5 text-[var(--theme-primary)]" />
                <h2 className="text-lg font-semibold text-[var(--theme-text)]">
                  Your Cart
                  {totalItems > 0 && (
                    <span className="ml-2 rounded-full bg-[var(--theme-primary)] px-2 py-0.5 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-danger)] transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="rounded-full p-1.5 text-[var(--theme-text-muted)] hover:bg-[var(--theme-border)] transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="rounded-full bg-[var(--theme-surface-elevated)] p-6">
                    <ShoppingBag className="h-10 w-10 text-[var(--theme-text-muted)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--theme-text)]">Your cart is empty</p>
                    <p className="text-sm text-[var(--theme-text-muted)] mt-1">
                      Add items from a restaurant to get started
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="rounded-xl bg-[var(--theme-primary)] px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Browse Restaurants
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  <ul className="space-y-3">
                    {items.map((item, i) => (
                      <motion.li
                        key={item.id}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className={cn(
                          'flex gap-3 rounded-xl p-3',
                          'bg-[var(--theme-background)]',
                          'border border-[var(--theme-border)]'
                        )}
                      >
                        {item.image && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm text-[var(--theme-text)] truncate">{item.name}</p>
                          {item.options && item.options.length > 0 && (
                            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5 truncate">
                              {item.options.map(o => o.name).join(', ')}
                            </p>
                          )}
                          <p className="text-sm font-semibold text-[var(--theme-primary)] mt-1">
                            AED {((item.price + (item.options?.reduce((s, o) => s + o.price, 0) ?? 0)) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end justify-between gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--theme-text-muted)] hover:text-[var(--theme-danger)] transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <div className="flex items-center gap-1.5">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </motion.button>
                            <span className="w-5 text-center text-sm font-semibold text-[var(--theme-text)]">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--theme-primary)] text-white hover:opacity-90 transition-opacity"
                            >
                              <Plus className="h-3 w-3" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--theme-border)] px-5 py-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[var(--theme-text-muted)]">
                    <span>Subtotal</span>
                    <span>AED {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--theme-text-muted)]">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-[var(--theme-success)] font-medium' : ''}>
                      {deliveryFee === 0 ? 'Free' : `AED ${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-base text-[var(--theme-text)] border-t border-[var(--theme-border)] pt-2">
                    <span>Total</span>
                    <span>AED {total.toFixed(2)}</span>
                  </div>
                </div>

                {subtotal < 50 && deliveryFee > 0 && (
                  <p className="text-xs text-[var(--theme-text-muted)] text-center">
                    Add AED {(50 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}

                <Link href="/checkout" onClick={onClose}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center justify-between rounded-xl bg-[var(--theme-primary)] px-5 py-3.5 text-white cursor-pointer"
                  >
                    <span className="font-semibold">Checkout</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">AED {total.toFixed(2)}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </motion.div>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
