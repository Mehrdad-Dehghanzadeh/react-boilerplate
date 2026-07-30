import { create } from 'zustand'
import type { TLoginStore } from './TLogin'
import type { ILoginRes } from '@ts/services/Auth'

export const useLoginStore = create<TLoginStore>((set) => ({
  mobile: '',
  step: 0,
  loginResData: null,

  setLoginResData: (loginResData: ILoginRes) => set(() => ({ loginResData })),
  setMobileNumber: (mobile: string) => set(() => ({ mobile })),
  setStep: (step: number) => set(() => ({ step })),
  clear: () => set(() => ({ loginResData: null, step: 0 }))
}))
