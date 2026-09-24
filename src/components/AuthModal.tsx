'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react'

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          <Dialog.Panel className="relative w-full max-w-sm">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-5 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <Dialog.Title className="text-xl font-bold">
                  {isLogin ? 'Welcome back! 👋' : 'Create account'}
                </Dialog.Title>
                <p className="text-orange-100 text-sm mt-1">
                  {isLogin
                    ? 'Sign in to track your orders and more'
                    : 'Join thousands of happy customers'}
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* OAuth buttons */}
                <button className="w-full flex items-center justify-center gap-2.5 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Chrome className="h-4 w-4 text-blue-500" />
                  Continue with Google
                </button>
                <button className="w-full flex items-center justify-center gap-2.5 bg-[#1877F2] text-white rounded-xl py-2.5 text-sm font-medium hover:bg-[#166FE5] transition-colors">
                  Continue with Facebook
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 uppercase tracking-wider">
                      or
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  {!isLogin && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Full name"
                        className="input-base"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email address"
                      className="input-base pl-9"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="input-base pl-9 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <button type="button" className="text-xs text-orange-500 hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-2.5 transition-colors text-sm"
                  >
                    {isLogin ? 'Sign in' : 'Create account'}
                  </motion.button>
                </form>

                {/* Toggle */}
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </motion.div>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

