import { create } from 'zustand'

interface NavigationState {
  isNavigating: boolean
  redirectPath: string | null
  setNavigating: (isNavigating: boolean) => void
  setRedirectPath: (path: string | null) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isNavigating: false,
  redirectPath: null,

  setNavigating: (isNavigating: boolean) => set({ isNavigating }),

  setRedirectPath: (path: string | null) => set({ redirectPath: path }),
}))
