'use client'
import { useId, useState, type FormEvent } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { cn } from '@/utils/theme'
import { dialog, fadeIn, press, spring } from '@/utils/motion'

type AuthMode = 'login' | 'signup'

const modes: { id: AuthMode; label: string }[] = [
  { id: 'login', label: 'Login' },
  { id: 'signup', label: 'Sign Up' },
]

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'

const fieldClass = cn(
  'h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-base text-gray-900 placeholder:text-gray-500 transition-shadow',
  'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500',
  'dark:border-zinc-600 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400'
)

const socialButton = cn(
  'flex h-11 w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors',
  focusRing
)

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const fieldId = useId()
  const isLogin = mode === 'login'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static open onClose={onClose} className="relative z-50">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            aria-hidden="true"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
              <DialogPanel
                as={motion.div}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dialog}
                className="relative w-full max-w-md space-y-5 rounded-2xl bg-white p-5 text-gray-900 shadow-2xl sm:p-6 dark:bg-zinc-800 dark:text-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <DialogTitle className="text-xl font-bold">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </DialogTitle>
                  <motion.button
                    {...press}
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className={cn(
                      'grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white',
                      focusRing
                    )}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </motion.button>
                </div>

                <div role="tablist" aria-label="Account" className="grid grid-cols-2 rounded-full bg-gray-100 p-1 dark:bg-zinc-900">
                  {modes.map(m => {
                    const selected = m.id === mode
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setMode(m.id)}
                        className={cn(
                          'relative h-10 rounded-full text-sm font-semibold transition-colors',
                          focusRing,
                          selected ? 'text-gray-900 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white'
                        )}
                      >
                        {selected && (
                          <motion.span
                            layoutId="auth-mode-pill"
                            transition={spring.layout}
                            className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-700"
                          />
                        )}
                        <span className="relative">{m.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    className={cn(socialButton, 'border border-gray-300 hover:bg-gray-50 dark:border-zinc-600 dark:hover:bg-zinc-700')}
                  >
                    <FcGoogle className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="truncate">Google</span>
                  </button>
                  <button type="button" className={cn(socialButton, 'bg-blue-600 text-white hover:bg-blue-700')}>
                    <FaFacebook className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="truncate">Facebook</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-zinc-400" aria-hidden="true">
                  <span className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
                  or with email
                  <span className="h-px flex-1 bg-gray-200 dark:bg-zinc-700" />
                </div>

                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor={`${fieldId}-email`} className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input id={`${fieldId}-email`} type="email" autoComplete="email" required placeholder="you@example.com" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor={`${fieldId}-password`} className="mb-1 block text-sm font-medium">
                      Password
                    </label>
                    <input
                      id={`${fieldId}-password`}
                      type="password"
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      required
                      className={fieldClass}
                    />
                  </div>
                  {isLogin && (
                    <div className="text-right">
                      <button type="button" className={cn('inline-flex min-h-10 items-center rounded text-sm font-medium text-blue-700 hover:underline dark:text-blue-400', focusRing)}>
                        Forgot password?
                      </button>
                    </div>
                  )}
                  <motion.button
                    {...press}
                    type="submit"
                    className={cn('h-11 w-full rounded-xl bg-orange-700 font-semibold text-white transition-colors hover:bg-orange-800', focusRing)}
                  >
                    {isLogin ? 'Login' : 'Create account'}
                  </motion.button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-zinc-300">
                  {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    onClick={() => setMode(isLogin ? 'signup' : 'login')}
                    className={cn('inline-flex min-h-10 items-center rounded font-semibold text-orange-700 hover:underline dark:text-orange-400', focusRing)}
                  >
                    {isLogin ? 'Create an account' : 'Login'}
                  </button>
                </p>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
