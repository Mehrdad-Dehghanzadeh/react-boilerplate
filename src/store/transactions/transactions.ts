import { create } from 'zustand'
import type { TTransactionsStore } from './TTransactions'

export const useTransactionsStore = create<TTransactionsStore>((set) => ({
  loading: false,
  branches: [{ title: 'همه شعب', value: 0 }],
  filters: null,

  setLoading: (loading) => set(() => ({ loading })),
  setBranches: (branches) => set(() => ({ branches })),
  setFilters: (filters) => set(() => ({ filters }))
}))
