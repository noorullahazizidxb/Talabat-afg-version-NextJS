'use client'

import { useReducedMotion } from '../hooks/useReducedMotion'
import ErrorBoundary from './ErrorBoundary'

/**
 * Shell layout for Pages Router pages.
 * It is thin on purpose — theme, toast, and providers are handled
 * in _app.tsx so Layout has a single responsibility: page frame. ✓ SRP.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
  )
}

/**
 * Minimal page wrapper without the top navigation (used by pages that
 * supply their own navbar, e.g. the home page).
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ErrorBoundary>
        <main id="main-content" tabIndex={-1} className="outline-none min-h-screen">
          {children}
        </main>
      </ErrorBoundary>
    </>
  )
}

