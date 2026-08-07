import type { IDashboardRes } from '@ts/services/Report'

export type TDashboardStates = {
  loading: boolean
  dashboardData: IDashboardRes | null
}

export type TDashboardStore = TDashboardStates & {
  setLoading: (loading: boolean) => void
  setDashboardData: (data: IDashboardRes) => void
}
