export type TRoles = 'admin' | 'reporter' | 'viewer'

export type EnumMapper = { color?: string; title: string }

export type TAccountItem = {
  id: number
  active: boolean
  branch_id: number
  created_at: string
  deleted_at: string
  first_name: string
  last_name: string
  merchant_id: number
  mobile: string
  role: TRoles
}

export type TBranchItem = {
  provider_id: number
  store_name: string
}

export type TBranchItems = TBranchItem[]
