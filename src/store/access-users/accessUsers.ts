import { create } from 'zustand'
import type { TAccessUsersStore } from './TAccessUsers'

export const useAccessUserStore = create<TAccessUsersStore>((set) => ({
  step: 0,
  formData: null,
  branchResData: null,
  branches: [],

  setBranchResData: (branchResData) => set(() => ({ branchResData })),
  setBranches: (branches) => set(() => ({ branches })),
  setFormData: (formData) => set(() => ({ formData })),
  setStep: (step: number) => set(() => ({ step })),
  clear: () => set(() => ({ step: 0, formData: null, branchResData: null }))
}))
