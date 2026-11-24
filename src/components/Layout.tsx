'use client'

import { MotionConfig } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundary'
import { ToastContainer } from './ui/Toast'
import { Modal } from './ui/Modal'
import { SkipLink } from './ui/SkipLink'
import SEO from './SEO'

export default function Layout({
  children,
  title,
  description,
  path,
}: {
  children: React.ReactNode
  title?: string
  description?: string
  path?: string
}) {
  return (
    <MotionConfig reducedMotion="user">
      {title && <SEO title={title} description={description} path={path} />}

      <ToastContainer />
      <Modal />

      <SkipLink targetId="main-content" />

      <div className="flex min-h-screen flex-col bg-background-light text-app-text transition-colors duration-200 dark:bg-background-dark">
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="container mx-auto flex-1 px-4 py-8 outline-none"
        >
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
