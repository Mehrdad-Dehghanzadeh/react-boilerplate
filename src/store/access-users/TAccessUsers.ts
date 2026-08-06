import type { ILoginRes } from '@ts/services/Auth'
import type { TBranchItems } from '@ts/Common'
import type { TAddUserForm } from '@pages/dashboard-access-users/_components'
export type TAccessUsersStates = {
  step: number
  branchResData: ILoginRes | null
  formData: TAddUserForm | null
  branches: TBranchItems
}

export type TAccessUsersStore = TAccessUsersStates & {
  setStep: (step: number) => void
  setBranchResData: (data: ILoginRes) => void
  setFormData: (data: TAddUserForm) => void
  setBranches: (branches: TBranchItems) => void
  clear: () => void
}
