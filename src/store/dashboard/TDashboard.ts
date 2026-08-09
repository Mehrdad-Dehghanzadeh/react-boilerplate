import type { IDashboardRes } from '@ts/services/Report'

export type TDashboardStates = {
  loading: boolean
  dashboardData: IDashboardRes | null
  branches: { title: string; value: string | number }[]
}

export type TDashboardStore = TDashboardStates & {
  setLoading: (loading: boolean) => void
  setDashboardData: (data: IDashboardRes) => void
  setBranches: (data: { title: string; value: string | number }[]) => void
}
