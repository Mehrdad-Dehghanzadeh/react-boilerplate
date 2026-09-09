import type { TRoles } from '@ts/Common'

export type TStep1Props = {
  close: () => void
  closeUpdate: () => void
}

export type TAddUserForm = {
  mobile: string
  branch_ids: number[]
  branch_id_providers: number[]
  role: TRoles | EmptyString
  first_name: string
  last_name: string
  active: number | null
}
