'use client'

import Head from 'next/head'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, CreditCard, Banknote, Clock, ShoppingBag, ChevronRight,
  CheckCircle2, Minus, Plus, Trash2, ArrowLeft, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { cn } from '@/utils/theme'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { api } from '@/utils/api'
import { useRouter } from 'next/router'

type PaymentMethod = 'CASH' | 'CARD'
type Step = 'cart' | 'address' | 'payment' | 'confirm'

const STEPS: { id: Step; label: string }[] = [
  { id: 'cart', label: 'Cart' },
  { id: 'address', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirm' },
]

function StepIndicator({ current }: { current: Step }) {
  const idx = STEPS.findIndex(s => s.id === current)
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors',
            i <= idx ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'
          )}>
            {i < idx ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn('h-0.5 w-8 sm:w-12 transition-colors', i < idx ? 'bg-[var(--theme-primary)]' : 'bg-[var(--theme-border)]')} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, updateItemQuantity, removeItem, clearCart, restaurantId } = useCartStore()
  const { isAuthenticated, profile } = useUserStore()
  const [step, setStep] = useState<Step>('cart')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH')
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [instructions, setInstructions] = useState('')
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const deliveryFee = subtotal >= 50 ? 0 : 5
  const total = subtotal + deliveryFee

  const addresses = profile?.addresses ?? []

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) { router.push('/auth/login'); return }
    const addressId = selectedAddressId || addresses[0]?.id
    if (!addressId) { setError('Please add a delivery address.'); return }
    if (!restaurantId) { setError('Your cart is empty.'); return }

    setPlacing(true)
    setError(null)
    try {
      const order = await api.post<{ id: string }>('/orders', {
        restaurantId,
        deliveryAddressId: addressId,
        paymentMethod,
        specialInstructions: instructions || undefined,
        items: items.map(i => ({ menuItemId: i.id, quantity: i.quantity, notes: i.options?.map(o => o.name).join(', ') })),
      })
      clearCart()
      setOrderId(order.id)
      setStep('confirm')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <>
      <Head><title>Checkout — Talabat</title></Head>
      <Header />
      <main className="min-h-screen bg-[var(--theme-background)] py-8">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/restaurants" className="flex items-center gap-1.5 text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors">
              <ArrowLeft className="h-4 w-4" />Back
            </Link>
            <StepIndicator current={step} />
          </div>

          <AnimatePresence mode="wait">
            {/* ─── Step: Cart ─────────────────────────────────── */}
            {step === 'cart' && (
              <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-xl font-bold text-[var(--theme-text)] mb-5">Your Order</h1>

                {items.length === 0 ? (
                  <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-12 text-center">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-[var(--theme-text-muted)] opacity-30" />
                    <p className="font-semibold text-[var(--theme-text)]">Your cart is empty</p>
                    <Link href="/restaurants" className="mt-3 inline-block text-sm text-[var(--theme-primary)] font-medium">Browse restaurants →</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[var(--theme-text)] truncate">{item.name}</p>
                          <p className="text-sm font-bold text-[var(--theme-primary)] mt-1">AED {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-primary)] transition-colors">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-[var(--theme-text)]">{item.quantity}</span>
                          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--theme-primary)] text-white">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => removeItem(item.id)} className="ml-1 text-[var(--theme-text-muted)] hover:text-[var(--theme-danger)] transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 space-y-2 text-sm">
                      <div className="flex justify-between text-[var(--theme-text-muted)]"><span>Subtotal</span><span>AED {subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-[var(--theme-text-muted)]">
                        <span>Delivery</span>
                        <span className={deliveryFee === 0 ? 'text-[var(--theme-success)] font-medium' : ''}>{deliveryFee === 0 ? 'Free' : `AED ${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base text-[var(--theme-text)] border-t border-[var(--theme-border)] pt-2">
                        <span>Total</span><span>AED {total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--theme-text)] mb-1.5">Special instructions (optional)</label>
                      <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={2} placeholder="E.g. no onions, extra sauce…"
                        className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] resize-none" />
                    </div>

                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setStep('address')}
                      className="w-full flex items-center justify-between rounded-xl bg-[var(--theme-primary)] px-5 py-4 text-white font-semibold">
                      <span>Continue to Delivery</span>
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── Step: Address ───────────────────────────────── */}
            {step === 'address' && (
              <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-xl font-bold text-[var(--theme-text)] mb-5">Delivery Address</h1>
                {addresses.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] p-8 text-center">
                    <MapPin className="h-10 w-10 mx-auto mb-3 text-[var(--theme-text-muted)] opacity-40" />
                    <p className="text-sm text-[var(--theme-text-muted)]">No saved addresses. Add one in your profile.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map(addr => (
                      <button key={addr.id} onClick={() => setSelectedAddressId(addr.id)}
                        className={cn('w-full text-left rounded-xl border p-4 transition-all', selectedAddressId === addr.id || (addr.isDefault && !selectedAddressId) ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/5' : 'border-[var(--theme-border)] bg-[var(--theme-surface)]')}>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--theme-primary)]" />
                          <div>
                            <p className="font-semibold text-sm text-[var(--theme-text)]">{addr.title}</p>
                            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">{addr.fullAddress}</p>
                          </div>
                          {addr.isDefault && <span className="ml-auto text-[10px] font-semibold text-[var(--theme-primary)] border border-[var(--theme-primary)] rounded-full px-2 py-0.5">Default</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setStep('cart')} className="flex-1 rounded-xl border border-[var(--theme-border)] py-3 text-sm font-medium text-[var(--theme-text)] hover:bg-[var(--theme-surface-elevated)] transition-colors">Back</button>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setStep('payment')}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--theme-primary)] py-3 text-sm font-semibold text-white">
                    Continue <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ─── Step: Payment ────────────────────────────────── */}
            {step === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="text-xl font-bold text-[var(--theme-text)] mb-5">Payment Method</h1>
                <div className="space-y-3">
                  {([['CASH', 'Cash on Delivery', 'Pay when your order arrives', Banknote], ['CARD', 'Card Payment', 'Pay online securely', CreditCard]] as const).map(([method, label, desc, Icon]) => (
                    <button key={method} onClick={() => setPaymentMethod(method as PaymentMethod)}
                      className={cn('w-full flex items-center gap-4 rounded-xl border p-4 transition-all text-left', paymentMethod === method ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/5' : 'border-[var(--theme-border)] bg-[var(--theme-surface)]')}>
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-full', paymentMethod === method ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-surface-elevated)] text-[var(--theme-text-muted)]')}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[var(--theme-text)]">{label}</p>
                        <p className="text-xs text-[var(--theme-text-muted)]">{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4 space-y-2 text-sm">
                  <p className="font-semibold text-[var(--theme-text)] mb-2">Order Summary</p>
                  {items.map(i => (
                    <div key={i.id} className="flex justify-between text-[var(--theme-text-muted)]">
                      <span>{i.name} ×{i.quantity}</span><span>AED {(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[var(--theme-text-muted)] border-t border-[var(--theme-border)] pt-2">
                    <span>Delivery</span><span className={deliveryFee === 0 ? 'text-[var(--theme-success)] font-medium' : ''}>{deliveryFee === 0 ? 'Free' : `AED ${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-[var(--theme-text)] border-t border-[var(--theme-border)] pt-2">
                    <span>Total</span><span>AED {total.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--theme-danger)]/10 border border-[var(--theme-danger)]/30 px-4 py-3 text-sm text-[var(--theme-danger)]">
                    <AlertCircle className="h-4 w-4 shrink-0" />{error}
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <button onClick={() => setStep('address')} className="flex-1 rounded-xl border border-[var(--theme-border)] py-3 text-sm font-medium text-[var(--theme-text)] hover:bg-[var(--theme-surface-elevated)] transition-colors">Back</button>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handlePlaceOrder} disabled={placing}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--theme-primary)] py-3 text-sm font-semibold text-white disabled:opacity-60">
                    {placing ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : null}
                    {placing ? 'Placing…' : `Place Order · AED ${total.toFixed(2)}`}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ─── Step: Confirmed ─────────────────────────────── */}
            {step === 'confirm' && (
              <motion.div key="confirm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--theme-success)]/15">
                  <CheckCircle2 className="h-10 w-10 text-[var(--theme-success)]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-[var(--theme-text)] mb-2">Order Placed!</h2>
                <p className="text-[var(--theme-text-muted)] mb-2">Your order has been received</p>
                {orderId && <p className="text-xs font-mono text-[var(--theme-text-muted)] mb-6">#{orderId.slice(-8).toUpperCase()}</p>}
                <div className="flex items-center justify-center gap-2 text-sm text-[var(--theme-text-muted)] mb-8">
                  <Clock className="h-4 w-4" /><span>Estimated delivery: 30–45 minutes</span>
                </div>
                <Link href="/restaurants">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--theme-primary)] px-8 py-3 text-white font-semibold">
                    Order Again
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  )
}
