import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // Loading states
  isLoading: boolean
  loadingMessage: string | null
  setLoading: (isLoading: boolean, message?: string | null) => void
  
  // Modal states
  isModalOpen: boolean
  modalContent: React.ReactNode | null
  modalTitle: string | null
  openModal: (title: string, content: React.ReactNode) => void
  closeModal: () => void
  
  // Sidebar states (for mobile)
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
  
  // Notification count
  notificationCount: number
  setNotificationCount: (count: number) => void
  incrementNotificationCount: () => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Loading states
      isLoading: false,
      loadingMessage: null,
      setLoading: (isLoading, message = null) => set({ isLoading, loadingMessage: message }),
      
      // Modal states
      isModalOpen: false,
      modalContent: null,
      modalTitle: null,
      openModal: (title, content) => set({ isModalOpen: true, modalTitle: title, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null, modalTitle: null }),
      
      // Sidebar states
      isSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      
      // Notification count
      notificationCount: 0,
      setNotificationCount: (count) => set({ notificationCount: count }),
      incrementNotificationCount: () => set((state) => ({ notificationCount: state.notificationCount + 1 })),
      clearNotifications: () => set({ notificationCount: 0 }),
    }),
    {
      name: 'talabat-ui-storage',
      partialize: (state) => ({ 
        notificationCount: state.notificationCount 
      }),
    }
  )
)
