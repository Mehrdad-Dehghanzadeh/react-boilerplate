import type { TRoles } from '@ts/Common'

export type TStep1Props = {
  close: () => void
}

export type TAddUserForm = {
  mobile: string
  branch_ids: number[]
  role: TRoles | EmptyString
  first_name: string
  last_name: string
}
