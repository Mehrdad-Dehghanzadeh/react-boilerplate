import { create } from 'zustand'
import type { TDepositStore } from './TDeposit'

export const useDeposit = create<TDepositStore>((set) => ({
  loading: false,
  settlementLoading: false,
  branches: [{ title: 'همه شعب', value: 0 }],
  filters: null,
  settlementFilters: null,

  setLoading: (loading) => set(() => ({ loading })),
  setSettlementLoading: (settlementLoading) => set(() => ({ settlementLoading })),
  setBranches: (branches) => set(() => ({ branches })),
  setFilters: (filters) => set(() => ({ filters })),
  setSettlementFilters: (settlementFilters) => set(() => ({ settlementFilters }))
}))
