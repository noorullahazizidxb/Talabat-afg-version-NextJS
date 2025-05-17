'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUserStore, userActions } from '@/store/userStore'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getSafePath, createReturnUrl } from '@/utils/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallbackUrl?: string
  requireAuth?: boolean
  roles?: string[]
}

/**
 * A component that protects routes requiring authentication
 * @param children - The content to render if authenticated
 * @param fallbackUrl - The URL to redirect to if not authenticated (default: /login)
 * @param requireAuth - Whether authentication is required (default: true)
 * @param roles - Optional array of roles that are allowed to access this route
 */
export function ProtectedRoute({ 
  children, 
  fallbackUrl = '/login', 
  requireAuth = true,
  roles
}: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, profile, isLoading } = useUserStore()
  
  useEffect(() => {
    // Attempt to refresh token if needed
    userActions.refreshToken()
    
    // If we're still loading, don't do anything yet
    if (isLoading['refreshToken']) return
    
    // Handle authentication check
    if (requireAuth && !isAuthenticated) {
      // Redirect to login with return URL
      const returnUrl = createReturnUrl(pathname)
      // Ensure fallbackUrl is a string
      const redirectUrl = getSafePath(fallbackUrl, '/login')
      router.push(`${redirectUrl}?returnUrl=${returnUrl}`)
      return
    }
    
    // Handle role-based access if roles are specified
    if (requireAuth && isAuthenticated && roles && roles.length > 0) {
      // Check if user has required role (in a real app, profile would have roles)
      // Using type assertion since the UserProfile type doesn't include roles yet
      const userRoles = (profile as any)?.roles || []
      const hasRequiredRole = roles.some(role => userRoles.includes(role))
      
      if (!hasRequiredRole) {
        // Redirect to unauthorized page
        router.push('/unauthorized')
        return
      }
    }
    
    // Handle routes that should not be accessed when authenticated
    if (!requireAuth && isAuthenticated) {
      // Redirect to dashboard or home
      router.push('/')
      return
    }
  }, [isAuthenticated, isLoading, pathname, requireAuth, roles, router, fallbackUrl, profile])
  
  // Show loading state while checking authentication
  if (isLoading['refreshToken']) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    )
  }
  
  // If authentication is required and user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null
  }
  
  // If authentication is NOT required and user IS authenticated, don't render children
  if (!requireAuth && isAuthenticated) {
    return null
  }
  
  // If roles are specified and user doesn't have required role, don't render children
  if (requireAuth && isAuthenticated && roles && roles.length > 0) {
    const userRoles = (profile as any)?.roles || []
    const hasRequiredRole = roles.some(role => userRoles.includes(role))
    
    if (!hasRequiredRole) {
      return null
    }
  }
  
  // Otherwise, render the children
  return <>{children}</>
}
