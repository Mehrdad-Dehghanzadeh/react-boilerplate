import type { TRoles } from '@ts/Common'

export type TStep1Props = {
  close: () => void
}

export type TAddUserForm = {
  mobile: string
  branch_id: string
  role: TRoles | EmptyString
  first_name: string
  last_name: string
}
