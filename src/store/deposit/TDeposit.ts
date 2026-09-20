import type { ISettlementPayload } from '@/ts/services/Report'

export type TDepositStates = {
  loading: boolean
  branches: { title: string; value: string | number }[]
  filters: ISettlementPayload | null
}

export type TDepositStore = TDepositStates & {
  setLoading: (loading: boolean) => void
  setBranches: (branches: { title: string; value: string | number }[]) => void
  setFilters: (filters: ISettlementPayload | null) => void
}
