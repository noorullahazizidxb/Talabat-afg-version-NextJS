import { useEffect, useCallback, useState, RefObject } from 'react'

interface UseKeyboardNavigationOptions {
  enabled?: boolean
  onEscape?: () => void
  onEnter?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: (event: KeyboardEvent) => void
  preventDefaultKeys?: boolean
}

/**
 * Hook for handling keyboard navigation in components
 */
export function useKeyboardNavigation(
  ref: RefObject<HTMLElement>,
  options: UseKeyboardNavigationOptions = {}
) {
  const {
    enabled = true,
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    preventDefaultKeys = false
  } = options

  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const { key } = event

      const keyHandlers: Record<string, () => void> = {
        Escape: () => onEscape?.(),
        Enter: () => onEnter?.(),
        ArrowUp: () => onArrowUp?.(),
        ArrowDown: () => onArrowDown?.(),
        ArrowLeft: () => onArrowLeft?.(),
        ArrowRight: () => onArrowRight?.(),
        Tab: () => onTab?.(event)
      }

      const handler = keyHandlers[key]
      if (handler) {
        if (preventDefaultKeys && key !== 'Tab') {
          event.preventDefault()
        }
        handler()
      }
    },
    [
      enabled,
      onEscape,
      onEnter,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      onTab,
      preventDefaultKeys
    ]
  )

  // Track focus state
  const handleFocus = useCallback(() => setIsFocused(true), [])
  const handleBlur = useCallback(() => setIsFocused(false), [])

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    // Add event listeners
    element.addEventListener('keydown', handleKeyDown as EventListener)
    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    return () => {
      // Clean up event listeners
      element.removeEventListener('keydown', handleKeyDown as EventListener)
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }, [ref, enabled, handleKeyDown, handleFocus, handleBlur])

  return { isFocused }
}
