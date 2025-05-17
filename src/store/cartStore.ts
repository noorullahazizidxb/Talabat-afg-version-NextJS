import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from '../components/ui/Toast'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  restaurantId: string
  options?: CartItemOption[]
}

export interface CartItemOption {
  id: string
  name: string
  price: number
}

interface CartState {
  // Cart data
  items: CartItem[]
  restaurantId: string | null
  
  // Cart metadata
  lastUpdated: number
  
  // Derived values
  totalItems: number
  subtotal: number
  
  // Actions
  addItem: (item: CartItem) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  
  // Restaurant validation
  canAddFromRestaurant: (restaurantId: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      restaurantId: null,
      lastUpdated: Date.now(),
      
      // Derived values
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      
      get subtotal() {
        return get().items.reduce((total, item) => {
          const itemTotal = item.price * item.quantity
          const optionsTotal = item.options?.reduce(
            (sum, option) => sum + option.price, 0
          ) || 0
          return total + itemTotal + (optionsTotal * item.quantity)
        }, 0)
      },
      
      // Actions
      addItem: (item) => {
        const { items, restaurantId, canAddFromRestaurant } = get()
        
        // Check if item is from the same restaurant
        if (restaurantId && item.restaurantId !== restaurantId && !canAddFromRestaurant(item.restaurantId)) {
          return
        }
        
        // Find if item already exists
        const existingItemIndex = items.findIndex(i => i.id === item.id)
        
        if (existingItemIndex >= 0) {
          // Update existing item
          set(state => {
            const newItems = [...state.items]
            newItems[existingItemIndex].quantity += item.quantity
            
            toast.success(`Updated ${item.name} quantity in cart`)
            
            return {
              items: newItems,
              restaurantId: item.restaurantId,
              lastUpdated: Date.now()
            }
          })
        } else {
          // Add new item
          set(state => {
            toast.success(`Added ${item.name} to cart`)
            
            return {
              items: [...state.items, item],
              restaurantId: state.restaurantId || item.restaurantId,
              lastUpdated: Date.now()
            }
          })
        }
      },
      
      updateItemQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        set(state => {
          const itemIndex = state.items.findIndex(item => item.id === itemId)
          
          if (itemIndex === -1) return state
          
          const newItems = [...state.items]
          newItems[itemIndex].quantity = quantity
          
          return {
            items: newItems,
            lastUpdated: Date.now()
          }
        })
      },
      
      removeItem: (itemId) => {
        set(state => {
          const itemIndex = state.items.findIndex(item => item.id === itemId)
          
          if (itemIndex === -1) return state
          
          const itemToRemove = state.items[itemIndex]
          const newItems = state.items.filter(item => item.id !== itemId)
          
          toast.info(`Removed ${itemToRemove.name} from cart`)
          
          // If cart is empty, reset restaurantId
          const newRestaurantId = newItems.length > 0 ? state.restaurantId : null
          
          return {
            items: newItems,
            restaurantId: newRestaurantId,
            lastUpdated: Date.now()
          }
        })
      },
      
      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          lastUpdated: Date.now()
        })
        
        toast.info('Cart cleared')
      },
      
      canAddFromRestaurant: (newRestaurantId) => {
        const { items, restaurantId } = get()
        
        // If cart is empty or from the same restaurant, allow adding
        if (items.length === 0 || restaurantId === newRestaurantId) {
          return true
        }
        
        // Ask user if they want to clear cart and start a new order
        const confirmed = window.confirm(
          'Your cart contains items from another restaurant. Would you like to clear your cart and add this item instead?'
        )
        
        if (confirmed) {
          get().clearCart()
          return true
        }
        
        return false
      }
    }),
    {
      name: 'talabat-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        restaurantId: state.restaurantId,
        lastUpdated: state.lastUpdated
      }),
    }
  )
)
