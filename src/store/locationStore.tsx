// store/locationStore.ts
import { create } from 'zustand'

type LocationStore = {
  location: string
  setLocation: (loc: string) => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  location: '',
  setLocation: (loc) => set({ location: loc }),
}))
