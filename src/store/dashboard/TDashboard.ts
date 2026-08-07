import type { IDashboardRes, IDashboardPayload } from '@ts/services/Report'

export type TDashboardStates = {
  loading: boolean
  dashboardData: IDashboardRes | null
  filters: IDashboardPayload
}

export type TDashboardStore = TDashboardStates & {
  setLoading: (loading: boolean) => void
  setDashboardData: (data: IDashboardRes) => void
  setFilters: (filters: IDashboardPayload) => void
}
