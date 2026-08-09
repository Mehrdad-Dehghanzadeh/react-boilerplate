import { create } from 'zustand'
import type { TDashboardStore } from './TDashboard'

export const useDashboardStore = create<TDashboardStore>((set) => ({
  loading: false,
  dashboardData: null,
  branches: [{ title: 'همه شعب', value: 0 }],

  setLoading: (loading) => set(() => ({ loading })),
  setDashboardData: (dashboardData) => set(() => ({ dashboardData })),
  setBranches: (branches) => set(() => ({ branches }))
}))
