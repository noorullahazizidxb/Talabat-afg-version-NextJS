'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
      <Dialog.Panel>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-800 rounded-lg w-full max-w-md p-6 space-y-4"
        >
          <Dialog.Title className="text-xl font-semibold text-center">{isLogin ? 'Login' : 'Sign Up'}</Dialog.Title>

          <button className="w-full border py-2 rounded text-sm flex items-center justify-center gap-2">
            <img src="/img/google.svg" className="h-5" /> Continue with Google
          </button>
          <button className="w-full bg-blue-600 text-white py-2 rounded text-sm">Continue with Facebook</button>

          <div className="text-center text-xs text-gray-500">OR</div>

          <form className="space-y-2">
            <input type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" />
            <input type="password" placeholder="Password" className="w-full border px-3 py-2 rounded" />
            <div className="text-right text-xs text-blue-600 cursor-pointer">Forgot password?</div>
            <button className="bg-orange-500 w-full py-2 text-white rounded">Login</button>
          </form>

          <div className="text-sm text-center">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <span className="text-orange-600 cursor-pointer" onClick={() => setIsLogin(false)}>
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="text-orange-600 cursor-pointer" onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </>
            )}
          </div>
        </motion.div>
      </Dialog.Panel>
    </Dialog>
  )
}
