import { create } from 'zustand'
import type { TDashboardStore } from './TDashboard'

export const useDashboardStore = create<TDashboardStore>((set) => ({
  loading: false,
  dashboardData: null,


  setLoading: (loading) => set(() => ({ loading })),
  setDashboardData: (dashboardData) => set(() => ({ dashboardData })),
}))
