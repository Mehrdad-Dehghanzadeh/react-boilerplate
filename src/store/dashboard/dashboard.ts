import { create } from 'zustand'
import type { TDashboardStore } from './TDashboard'

export const useDashboardStore = create<TDashboardStore>((set) => ({
  loading: false,
  dashboardData: null,
  filters: {
    duration_create: 30
  },

  setLoading: (loading) => set(() => ({ loading })),
  setDashboardData: (dashboardData) => set(() => ({ dashboardData })),
  setFilters: (filters) => set(() => ({ filters }))
}))
