'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { cn } from '../../utils/theme'

export function Modal() {
  const { isModalOpen, modalContent, modalTitle, closeModal } = useUIStore()
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Check if user prefers reduced motion
  const prefersReducedMotion = 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (overlayRef.current && modalRef.current && 
          e.target === overlayRef.current && 
          !modalRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }

    // Close modal on escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    // Prevent scrolling when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, closeModal])

  // Animation variants
  const overlayVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }

  const modalVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className={cn(
              "bg-white dark:bg-gray-800 rounded-xl shadow-xl",
              "max-w-md w-full max-h-[90vh] overflow-auto"
            )}
            variants={modalVariants}
            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                {modalTitle}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-4">
              {modalContent}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
