'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUserStore, userActions } from '@/store/userStore'
import { analytics } from '@/utils/analytics'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  userId: string | null
  userEmail: string | null
  userName: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userId: null,
  userEmail: null,
  userName: null,
  logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { 
    isAuthenticated, 
    isLoading, 
    profile, 
    logout
  } = useUserStore()
  
  const [isInitialized, setIsInitialized] = useState(false)
  
  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      // Try to refresh token if needed
      await userActions.refreshToken()
      setIsInitialized(true)
      
      // Initialize analytics with user ID if authenticated
      if (isAuthenticated && profile) {
        analytics.initialize({
          userId: profile.id
        })
      }
    }
    
    initAuth()
    
    // Set up token refresh interval (every 15 minutes)
    const refreshInterval = setInterval(() => {
      userActions.refreshToken()
    }, 15 * 60 * 1000)
    
    return () => clearInterval(refreshInterval)
  }, [isAuthenticated, profile])
  
  // Derived user data
  const userId = profile?.id || null
  const userEmail = profile?.email || null
  const userName = profile ? `${profile.firstName} ${profile.lastName}` : null
  
  // Check if any auth-related actions are loading
  const authLoading = Boolean(
    isLoading['login'] || 
    isLoading['register'] || 
    isLoading['refreshToken']
  )
  
  // Context value
  const value = {
    isAuthenticated,
    isLoading: authLoading || !isInitialized,
    userId,
    userEmail,
    userName,
    logout
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
