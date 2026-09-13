import { create } from 'zustand'
import type { TDepositStore } from './TDeposit'

export const useDeposit = create<TDepositStore>((set) => ({
  loading: false,
  branches: [{ title: 'همه شعب', value: 0 }],
  filters: null,

  setLoading: (loading) => set(() => ({ loading })),
  setBranches: (branches) => set(() => ({ branches })),
  setFilters: (filters) => set(() => ({ filters }))
}))
