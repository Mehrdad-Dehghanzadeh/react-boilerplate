export type TLoginStates = {
  step: number
  token: string
  mobile_number: string
}

export type TLoginStore = TLoginStates & {
  setToken: (token: string) => void
  setMobileNumber: (token: string) => void
  setStep: (step: number) => void
  clear: () => void
}
