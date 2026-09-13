import type { IRefundPayload } from '@/ts/services/Report'

export type TDepositStates = {
  loading: boolean
  branches: { title: string; value: string | number }[]
  filters: IRefundPayload | null
}

export type TDepositStore = TDepositStates & {
  setLoading: (loading: boolean) => void
  setBranches: (branches: { title: string; value: string | number }[]) => void
  setFilters: (filters: IRefundPayload | null) => void
}
