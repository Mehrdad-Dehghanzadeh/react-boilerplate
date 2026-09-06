import type { ILoginRes } from '@ts/services/Auth'
import type { TBranchItems } from '@ts/Common'
import type { TAddUserForm } from '@pages/dashboard-access-users/_components'
import type { TAccountItem } from '@/ts/Common'

export type TAccessUsersStates = {
  step: number
  loading: boolean
  branchResData: ILoginRes | null
  formData: TAddUserForm | null
  branches: TBranchItems
  data: TAccountItem[]
  editRecord: TAccountItem | null
}

export type TAccessUsersStore = TAccessUsersStates & {
  setStep: (step: number) => void
  setLoading: (loading: boolean) => void
  setBranchResData: (data: ILoginRes) => void
  setFormData: (data: TAddUserForm) => void
  setBranches: (branches: TBranchItems) => void
  setData: (data: TAccountItem[]) => void
  setEditRecord: (record: TAccountItem | null) => void
  clear: () => void
}
