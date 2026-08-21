import type { IHomePayload } from '@/ts/services/Report'

export type TTransactionsStates = {
  loading: boolean
  branches: { title: string; value: string | number }[]
  filters: IHomePayload | null
}

export type TTransactionsStore = TTransactionsStates & {
  setLoading: (loading: boolean) => void
  setBranches: (branches: { title: string; value: string | number }[]) => void
  setFilters: (filters: IHomePayload | null) => void
}
