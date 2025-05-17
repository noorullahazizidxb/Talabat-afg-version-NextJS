'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getSafePath } from '@/utils/navigation'
import { motion } from 'framer-motion'
import { LoginForm } from '../../components/auth/LoginForm'
import { SignupForm } from '../../components/auth/SignupForm'
import { SocialLogin } from '../../components/auth/SocialLogin'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import SEO from '../../components/SEO'

function AuthContent() {
  const searchParams = useSearchParams()
  const returnUrl = getSafePath(searchParams.get('returnUrl'), '/')
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const prefersReducedMotion = useReducedMotion()
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }
  
  // Animation variants
  const containerVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      }
  
  return (
    <>
      <SEO 
        title={mode === 'login' ? 'Sign In' : 'Create Account'} 
        description={mode === 'login' 
          ? 'Sign in to your Talabat account to order food, track deliveries, and more.' 
          : 'Create a Talabat account to start ordering food from your favorite restaurants.'
        }
        path="/auth"
      />
      
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/">
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png"
              alt="Talabat"
            />
          </Link>
          
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h1>
          
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' ? (
              <>
                Or{' '}
                <button
                  onClick={toggleMode}
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={toggleMode}
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <motion.div
              key={mode}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              transition={{ duration: 0.3 }}
            >
              {mode === 'login' ? (
                <LoginForm redirectPath={returnUrl} />
              ) : (
                <SignupForm redirectPath={returnUrl} />
              )}
            </motion.div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <SocialLogin redirectPath={returnUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
}
