import type { ISettlementPayload, ISettlementItemPayload } from '@/ts/services/Report'

export type TDepositStates = {
  loading: boolean
  settlementLoading: boolean
  branches: { title: string; value: string | number }[]
  filters: ISettlementPayload | null
  settlementFilters: ISettlementItemPayload | null
}

export type TDepositStore = TDepositStates & {
  setLoading: (loading: boolean) => void
  setSettlementLoading: (settlementLoading: boolean) => void
  setBranches: (branches: { title: string; value: string | number }[]) => void
  setFilters: (filters: ISettlementPayload | null) => void
  setSettlementFilters: (settlementFilters: ISettlementItemPayload | null) => void
}
