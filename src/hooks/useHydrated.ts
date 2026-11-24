import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * `false` during SSR and hydration, `true` afterwards. Gate client-only values
 * (e.g. the resolved colour scheme) with it to keep server and client markup identical.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
