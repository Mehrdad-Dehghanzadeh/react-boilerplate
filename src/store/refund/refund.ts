import { create } from 'zustand'
import type { TRefundStore } from './TRefund'

export const useRefundStore = create<TRefundStore>((set) => ({
  loading: false,
  branches: [{ title: 'همه شعب', value: 0 }],
  filters: null,

  setLoading: (loading) => set(() => ({ loading })),
  setBranches: (branches) => set(() => ({ branches })),
  setFilters: (filters) => set(() => ({ filters }))
}))
