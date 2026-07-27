import { create } from 'zustand'
import type { TLoginStore } from './TLogin'

export const useLoginStore = create<TLoginStore>((set) => ({
  token: '',
  step: 0,
  mobile_number: '',

  setToken: (token: string) => set(() => ({ token })),
  setMobileNumber: (mobile_number: string) => set(() => ({ mobile_number })),
  setStep: (step: number) => set(() => ({ step })),
  clear: () => set(() => ({ token: '', step: 0 }))
}))
