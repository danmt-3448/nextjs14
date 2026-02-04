import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  loadingKeys: Set<string>
  setLoading: (key: string, loading: boolean) => void
  isLoadingKey: (key: string) => boolean
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  isLoading: false,
  loadingKeys: new Set(),

  setLoading: (key: string, loading: boolean) => {
    const newLoadingKeys = new Set(get().loadingKeys)
    if (loading) {
      newLoadingKeys.add(key)
    } else {
      newLoadingKeys.delete(key)
    }
    set({
      loadingKeys: newLoadingKeys,
      isLoading: newLoadingKeys.size > 0,
    })
  },

  isLoadingKey: (key: string) => {
    return get().loadingKeys.has(key)
  },
}))
