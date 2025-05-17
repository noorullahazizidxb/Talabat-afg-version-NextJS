'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundary'
import { ToastContainer } from './ui/Toast'
import { Modal } from './ui/Modal'
import { SkipLink } from './ui/SkipLink'
import SEO from './SEO'
import { useTheme, cn } from '../utils/theme'
import { useReducedMotion } from '../hooks/useReducedMotion'

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
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  // Adjust animations based on reduced motion preference
  const transitions = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 }
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 }
      };

  const mainTransitions = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 }
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2, duration: 0.4 }
      };
  
  return (
    <>
      {/* SEO */}
      {title && <SEO title={title} description={description} path={path} />}
      
      {/* Global components */}
      <ToastContainer />
      <Modal />
      
      {/* Accessibility skip link */}
      <SkipLink targetId="main-content" />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={resolvedTheme}
          {...transitions}
          className={cn(
            "min-h-screen flex flex-col transition-colors duration-200",
            "text-black dark:text-white",
            "bg-background-light dark:bg-background-dark"
          )}
        >
          <Header />
          <motion.main 
            id="main-content" /* Target for skip link */
            tabIndex={-1} /* Makes the element focusable */
            {...mainTransitions}
            className={cn(
              "flex-1 container mx-auto px-4 py-8 outline-none",
              "transition-colors duration-200"
            )}
          >
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </motion.main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
