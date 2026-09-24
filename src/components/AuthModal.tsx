'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Chrome, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode]             = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPwd]  = useState(false)
  const [loading, setLoading]       = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Replace with actual auth call
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
        {/* Branded header */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-500 px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              {mode === 'login' ? 'Welcome back! 👋' : 'Join Talabat'}
            </DialogTitle>
            <DialogDescription className="text-orange-100 mt-1">
              {mode === 'login'
                ? 'Sign in to track orders and discover restaurants'
                : 'Create an account and start ordering today'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-4">
          {/* OAuth */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full gap-2" type="button">
              <Chrome className="h-4 w-4 text-blue-500" />
              Continue with Google
            </Button>
            <Button className="w-full bg-[#1877F2] hover:bg-[#166FE5] gap-2" type="button">
              Continue with Facebook
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground uppercase tracking-wider">
              or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <Input type="text" placeholder="Full name" required
                startIcon={<User className="h-4 w-4" />} />
            )}
            <Input type="email" placeholder="Email address" required
              startIcon={<Mail className="h-4 w-4" />} />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password" required
              startIcon={<Lock className="h-4 w-4" />}
              endIcon={
                <button type="button" onClick={() => setShowPwd(!showPassword)}
                  className="hover:text-foreground transition-colors" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}
            <Button type="submit" className="w-full" isLoading={loading}>
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-primary font-medium hover:underline">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
