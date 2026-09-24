import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { notify as toast } from '@/lib/notify'
import { analytics, EventTypes } from '../utils/analytics'
import { withAsyncActions, AsyncActionState, AsyncActionsApi } from './middleware'

export interface UserAddress {
  id: string
  title: string
  fullAddress: string
  apartment?: string
  building?: string
  street: string
  area: string
  city: string
  isDefault: boolean
  instructions?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  addresses: UserAddress[]
  preferences: {
    marketingConsent: boolean
    pushNotifications: boolean
    emailNotifications: boolean
    smsNotifications: boolean
  }
}

// Define the user store state
export interface AuthState extends AsyncActionState {
  // Auth state
  isAuthenticated: boolean
  token: string | null
  tokenExpiry: number | null
  isLoading: Record<string, boolean>
  errors: Record<string, string | null>
  error: string | null
  
  // User data
  profile: UserProfile | null
  
  // Methods
  logout: () => void
  isTokenExpired: () => boolean
}

// Define the user store actions
export interface UserActions {
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
  }) => Promise<boolean>
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>
  refreshToken: () => Promise<boolean>
  addAddress: (address: Omit<UserAddress, 'id'>) => Promise<boolean>
  updateAddress: (id: string, addressData: Partial<UserAddress>) => Promise<boolean>
  removeAddress: (id: string) => Promise<boolean>
  setDefaultAddress: (id: string) => Promise<boolean>
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => Promise<boolean>
}

// Create the user store with zustand
const createUserStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      token: null,
      tokenExpiry: null,
      isLoading: {},
      errors: {},
      error: null,
      profile: null,
      
      // Actions
      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          tokenExpiry: null,
          profile: null,
          error: null
        })
        
        toast.info('You have been logged out')
      },
      
      isTokenExpired: () => {
        const { tokenExpiry } = get()
        
        if (!tokenExpiry) return true
        
        // Check if token is expired or about to expire (within 5 minutes)
        return Date.now() >= (tokenExpiry - (5 * 60 * 1000))
      }
    }),
    {
      name: 'talabat-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthState) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        tokenExpiry: state.tokenExpiry,
        profile: state.profile
      })
    }
  )
)

// Export the store
export const useUserStore = createUserStore

// Mock API functions (replace with actual API calls)
const mockApiLogin = async (email: string, password: string): Promise<{token: string, expiresIn: number, user: UserProfile}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock successful login
  return {
    token: 'mock-jwt-token',
    expiresIn: 3600, // 1 hour
    user: {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      addresses: [],
      preferences: {
        marketingConsent: false,
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false
      }
    }
  }
}

const mockApiRegister = async (userData: {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}): Promise<{token: string, expiresIn: number, user: UserProfile}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Mock successful registration
  return {
    token: 'mock-jwt-token',
    expiresIn: 3600, // 1 hour
    user: {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      addresses: [],
      preferences: {
        marketingConsent: false,
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false
      }
    }
  }
}

const mockApiRefreshToken = async (): Promise<{token: string, expiresIn: number}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Mock successful token refresh
  return {
    token: 'refreshed-mock-jwt-token',
    expiresIn: 3600 // 1 hour
  }
}

// Create and export the user actions
export const userActions: UserActions = {
  login: async (email: string, password: string) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, login: true },
        errors: { ...state.errors, login: null }
      }))
      
      const response = await mockApiLogin(email, password)
      
      createUserStore.setState({
        isAuthenticated: true,
        token: response.token,
        tokenExpiry: Date.now() + (response.expiresIn * 1000),
        profile: response.user,
        error: null
      })
      
      // Track login event
      analytics.trackEvent(EventTypes.LOGIN, {
        method: 'email'
      })
      // Set user ID in analytics
      analytics.setUserId(response.user.id)
      
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, login: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, login: false }
      }))
    }
  },
  
  register: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone?: string
  }) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, register: true },
        errors: { ...state.errors, register: null }
      }))
      
      const response = await mockApiRegister(userData)
      
      createUserStore.setState({
        isAuthenticated: true,
        token: response.token,
        tokenExpiry: Date.now() + (response.expiresIn * 1000),
        profile: response.user,
        error: null
      })
      
      // Track registration event
      analytics.trackEvent(EventTypes.SIGNUP, {
        method: 'email'
      })
      
      toast.success('Registration successful')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, register: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, register: false }
      }))
    }
  },
  
  updateProfile: async (profileData: Partial<UserProfile>) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, updateProfile: true },
        errors: { ...state.errors, updateProfile: null }
      }))
      
      const profile = createUserStore.getState().profile
      if (!profile) throw new Error('No profile found')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      createUserStore.setState({
        profile: {
          ...profile,
          ...profileData
        }
      })
      
      toast.success('Profile updated successfully')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, updateProfile: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to update profile: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, updateProfile: false }
      }))
    }
  },
  
  refreshToken: async () => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, refreshToken: true },
        errors: { ...state.errors, refreshToken: null }
      }))
      
      // Simulate API call
      const response = await mockApiRefreshToken()
      
      createUserStore.setState({
        token: response.token,
        tokenExpiry: Date.now() + (response.expiresIn * 1000)
      })
      
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, refreshToken: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to refresh token: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, refreshToken: false }
      }))
    }
  },
  
  addAddress: async (address: Omit<UserAddress, 'id'>) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, addAddress: true },
        errors: { ...state.errors, addAddress: null }
      }))
      
      const profile = createUserStore.getState().profile
      if (!profile) throw new Error('No profile found')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Create a new address with ID
      const newAddress: UserAddress = {
        ...address,
        id: Math.random().toString(36).substring(2, 10)
      }
      
      // If this is the first address or it's marked as default, make it default
      // and ensure other addresses are not default
      if (profile.addresses.length === 0 || newAddress.isDefault) {
        newAddress.isDefault = true
        
        const updatedAddresses = profile.addresses.map(addr => ({
          ...addr,
          isDefault: false
        }))
        
        createUserStore.setState({
          profile: {
            ...profile,
            addresses: [...updatedAddresses, newAddress]
          }
        })
      } else {
        createUserStore.setState({
          profile: {
            ...profile,
            addresses: [...profile.addresses, newAddress]
          }
        })
      }
      
      toast.success('Address added successfully')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, addAddress: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to add address: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, addAddress: false }
      }))
    }
  },
  
  updateAddress: async (id: string, addressData: Partial<UserAddress>) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, updateAddress: true },
        errors: { ...state.errors, updateAddress: null }
      }))
      
      const profile = createUserStore.getState().profile
      if (!profile) throw new Error('No profile found')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const addressIndex = profile.addresses.findIndex(addr => addr.id === id)
      if (addressIndex === -1) throw new Error('Address not found')
      
      const updatedAddresses = [...profile.addresses]
      updatedAddresses[addressIndex] = {
        ...updatedAddresses[addressIndex],
        ...addressData
      }
      
      // If this address is being set as default, update other addresses
      if (addressData.isDefault) {
        updatedAddresses.forEach((addr, index) => {
          if (index !== addressIndex) {
            addr.isDefault = false
          }
        })
      }
      
      createUserStore.setState({
        profile: {
          ...profile,
          addresses: updatedAddresses
        }
      })
      
      toast.success('Address updated successfully')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, updateAddress: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to update address: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, updateAddress: false }
      }))
    }
  },
  
  removeAddress: async (id: string) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, removeAddress: true },
        errors: { ...state.errors, removeAddress: null }
      }))
      
      const profile = createUserStore.getState().profile
      if (!profile) throw new Error('No profile found')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const updatedAddresses = profile.addresses.filter((addr: UserAddress) => addr.id !== id)
      
      // If we removed the default address and have other addresses, make the first one default
      if (
        profile.addresses.find((addr: UserAddress) => addr.id === id)?.isDefault &&
        updatedAddresses.length > 0
      ) {
        updatedAddresses[0].isDefault = true
      }
      
      createUserStore.setState({
        profile: {
          ...profile,
          addresses: updatedAddresses
        }
      })
      
      toast.success('Address removed successfully')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, removeAddress: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to remove address: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, removeAddress: false }
      }))
    }
  },
  
  setDefaultAddress: async (id: string) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, setDefaultAddress: true },
        errors: { ...state.errors, setDefaultAddress: null }
      }))
      
      const profile = createUserStore.getState().profile
      if (!profile) throw new Error('No profile found')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedAddresses = profile.addresses.map((addr: UserAddress) => ({
        ...addr,
        isDefault: addr.id === id
      }))
      
      createUserStore.setState({
        profile: {
          ...profile,
          addresses: updatedAddresses
        }
      })
      
      toast.success('Default address updated')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, setDefaultAddress: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to update default address: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, setDefaultAddress: false }
      }))
    }
  },
  
  updatePreferences: async (preferences: Partial<UserProfile['preferences']>) => {
    try {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, updatePreferences: true },
        errors: { ...state.errors, updatePreferences: null }
      }))
      
      const profile = createUserStore.getState().profile
      if (!profile) throw new Error('No profile found')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      createUserStore.setState({
        profile: {
          ...profile,
          preferences: {
            ...profile.preferences,
            ...preferences
          }
        }
      })
      
      toast.success('Preferences updated successfully')
      return true
    } catch (error) {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: { ...state.errors, updatePreferences: error instanceof Error ? error.message : 'Unknown error' }
      }))
      
      toast.error('Failed to update preferences: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    } finally {
      createUserStore.setState((state: AuthState) => ({
        ...state,
        isLoading: { ...state.isLoading, updatePreferences: false }
      }))
    }
  }
}

