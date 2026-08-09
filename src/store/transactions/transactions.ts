import { create } from 'zustand'
import type { TTransactionsStore } from './TTransactions'

export const useTransactionsStore = create<TTransactionsStore>((set) => ({
  loading: false,
  transactionsData: null,

  setLoading: (loading) => set(() => ({ loading })),
  setTransactionsData: (transactionsData) => set(() => ({ transactionsData }))
}))
