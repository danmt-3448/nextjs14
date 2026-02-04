export interface LoadingState {
  isLoading: boolean
  loadingKeys: Set<string>
}

export interface NavigationState {
  isNavigating: boolean
  redirectPath: string | null
}

export interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  language: 'en' | 'vi'
}
