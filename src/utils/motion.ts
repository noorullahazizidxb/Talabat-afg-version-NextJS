import type { Transition, Variants } from 'framer-motion'

/**
 * Single source of truth for motion across the app.
 * Components import tokens/variants from here instead of hand-writing
 * durations, easings and springs. Everything animates transform/opacity
 * only, so nothing in document flow shifts (no CLS).
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
 */

export const duration = {
  instant: 0.12,
  fast: 0.18,
  base: 0.28,
  slow: 0.45,
} as const

export const ease = {
  /** Decelerating curve for things entering the screen. */
  out: [0.22, 1, 0.36, 1],
  /** Accelerating curve for things leaving the screen. */
  in: [0.4, 0, 1, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, [number, number, number, number]>

export const spring = {
  /** Snappy feedback for presses, toggles and small elements. */
  snappy: { type: 'spring', stiffness: 520, damping: 34, mass: 0.7 },
  /** Panels, drawers and dialogs. */
  panel: { type: 'spring', stiffness: 380, damping: 36 },
  /** Layout reflow of list items. */
  layout: { type: 'spring', stiffness: 460, damping: 40 },
} as const satisfies Record<string, Transition>

/** Shared viewport config for scroll reveals: fire once, slightly before entering. */
export const revealViewport = { once: true, margin: '0px 0px -64px 0px' } as const

/** Parent that staggers its children's `hidden` → `visible` variants. */
export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

/** Small y-offset + fade. Used for section and card reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: duration.fast, ease: ease.in } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: ease.in } },
}

/** Items in a mutable list (cart lines, menu results). Pair with `layout`. */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring.layout },
  exit: { opacity: 0, x: 24, transition: { duration: duration.fast, ease: ease.in } },
}

/** Side drawer entering from the inline end. */
export const drawer: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: spring.panel },
  exit: { x: '100%', transition: { duration: duration.base, ease: ease.in } },
}

/** Centered dialog panel. */
export const dialog: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring.panel },
  exit: { opacity: 0, y: 8, scale: 0.98, transition: { duration: duration.fast, ease: ease.in } },
}

/** Dropdown / mobile menu panel that slides down from its trigger. */
export const dropdown: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out, staggerChildren: 0.035, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: duration.fast, ease: ease.in } },
}

export const dropdownItem: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: ease.out } },
}

/** Floating action (e.g. view-cart pill) rising from the bottom edge. */
export const floatUp: Variants = {
  hidden: { opacity: 0, y: 72 },
  visible: { opacity: 1, y: 0, transition: spring.panel },
  exit: { opacity: 0, y: 72, transition: { duration: duration.fast, ease: ease.in } },
}

/** Number/badge swap (quantities, counts). Use with AnimatePresence mode="popLayout". */
export const countSwap: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: spring.snappy },
  exit: { opacity: 0, y: 8, transition: { duration: duration.instant } },
}

/** Interaction presets — spread onto motion elements. */
export const press = {
  whileTap: { scale: 0.96 },
  transition: spring.snappy,
} as const

export const lift = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.985 },
  transition: spring.snappy,
} as const
