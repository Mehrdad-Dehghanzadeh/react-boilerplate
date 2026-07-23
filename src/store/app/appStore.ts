import { create } from 'zustand'
import type { TAppStore, THomeContext } from './TAppStore'

export const useAppStore = create<TAppStore>((set) => ({
  loading: true,

  homeContext: {
    birth_date: '',
    is_active: false,
    mobile: '',
    national_code: '',
    passport: '',
    postal_code: ''
  },

  setHomeContext: (data: THomeContext) => set(() => ({ homeContext: { ...data } })),
  setLoading: (loading: boolean) => set(() => ({ loading }))
}))
