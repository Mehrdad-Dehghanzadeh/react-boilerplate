import { create } from 'zustand'
import type { TAccessUsersStore } from './TAccessUsers'

export const useAccessUserStore = create<TAccessUsersStore>((set) => ({
  step: 0,
  formData: null,
  branchResData: null,
  branches: [],
  data: [],
  editRecord: null,
  loading: false,

  setBranchResData: (branchResData) => set(() => ({ branchResData })),
  setLoading: (loading) => set(() => ({ loading })),
  setData: (data) => set(() => ({ data })),
  setBranches: (branches) => set(() => ({ branches })),
  setFormData: (formData) => set(() => ({ formData })),
  setStep: (step: number) => set(() => ({ step })),
  setEditRecord: (editRecord) => set(() => ({ editRecord })),
  clear: () =>
    set(() => ({ step: 0, formData: null, branchResData: null, editRecord: null }))
}))
