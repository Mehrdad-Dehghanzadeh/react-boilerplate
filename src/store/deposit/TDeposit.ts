import type { ISettlementPayload } from '@/ts/services/Report'

export type TDepositStates = {
  loading: boolean
  settlementLoading: boolean
  branches: { title: string; value: string | number }[]
  filters: ISettlementPayload | null
  settlementFilters: ISettlementPayload | null
}

export type TDepositStore = TDepositStates & {
  setLoading: (loading: boolean) => void
  setSettlementLoading: (settlementLoading: boolean) => void
  setBranches: (branches: { title: string; value: string | number }[]) => void
  setFilters: (filters: ISettlementPayload | null) => void
  setSettlementFilters: (settlementFilters: ISettlementPayload | null) => void
}
