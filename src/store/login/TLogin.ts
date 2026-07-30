import type { ILoginRes } from '@/ts/services/Auth'

export type TLoginStates = {
  step: number
  mobile: string
  loginResData: ILoginRes | null
}

export type TLoginStore = TLoginStates & {
  setMobileNumber: (token: string) => void
  setStep: (step: number) => void
  setLoginResData: (data: ILoginRes) => void
  clear: () => void
}
