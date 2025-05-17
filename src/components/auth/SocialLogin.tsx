'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { getSafePath } from '@/utils/navigation'
import { useUserStore, userActions } from '@/store/userStore'
import { analytics } from '@/utils/analytics'

// Import icons
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'

interface SocialLoginProps {
  onSuccess?: () => void
  redirectPath?: string
  className?: string
}

export function SocialLogin({ onSuccess, redirectPath = '/', className }: SocialLoginProps) {
  const router = useRouter()
  const { isLoading } = useUserStore()
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  
  // Check if any auth action is loading
  const isAuthLoading = Boolean(
    isLoading['login'] || 
    isLoading['register'] || 
    isLoading['refreshToken']
  )
  
  // Mock social login functions
  const handleGoogleLogin = async () => {
    setLoadingProvider('google')
    
    try {
      // Track login attempt
      analytics.trackEvent('login', {
        method: 'google'
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real implementation, this would handle the OAuth flow
      // and then call your backend to authenticate the user
      
      if (onSuccess) {
        onSuccess()
      } else if (redirectPath) {
        // Ensure redirectPath is a string
        const safePath = getSafePath(redirectPath, '/')
        router.push(safePath)
      }
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setLoadingProvider(null)
    }
  }
  
  const handleFacebookLogin = async () => {
    setLoadingProvider('facebook')
    
    try {
      // Track login attempt
      analytics.trackEvent('login', {
        method: 'facebook'
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real implementation, this would handle the OAuth flow
      
      if (onSuccess) {
        onSuccess()
      } else if (redirectPath) {
        // Ensure redirectPath is a string
        const safePath = getSafePath(redirectPath, '/')
        router.push(safePath)
      }
    } catch (error) {
      console.error('Facebook login error:', error)
    } finally {
      setLoadingProvider(null)
    }
  }
  
  const handleAppleLogin = async () => {
    setLoadingProvider('apple')
    
    try {
      // Track login attempt
      analytics.trackEvent('login', {
        method: 'apple'
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real implementation, this would handle the OAuth flow
      
      if (onSuccess) {
        onSuccess()
      } else if (redirectPath) {
        // Ensure redirectPath is a string
        const safePath = getSafePath(redirectPath, '/')
        router.push(safePath)
      }
    } catch (error) {
      console.error('Apple login error:', error)
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <Button
        type="button"
        variant="outline"
        fullWidth
        isLoading={loadingProvider === 'google'}
        disabled={isAuthLoading || !!loadingProvider}
        leftIcon={<FaGoogle className="h-4 w-4 text-red-500" />}
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </Button>
      
      <Button
        type="button"
        variant="outline"
        fullWidth
        isLoading={loadingProvider === 'facebook'}
        disabled={isAuthLoading || !!loadingProvider}
        leftIcon={<FaFacebook className="h-4 w-4 text-blue-600" />}
        onClick={handleFacebookLogin}
      >
        Continue with Facebook
      </Button>
      
      <Button
        type="button"
        variant="outline"
        fullWidth
        isLoading={loadingProvider === 'apple'}
        disabled={isAuthLoading || !!loadingProvider}
        leftIcon={<FaApple className="h-4 w-4" />}
        onClick={handleAppleLogin}
      >
        Continue with Apple
      </Button>
    </div>
  )
}
