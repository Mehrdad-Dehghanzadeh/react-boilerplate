import { type IProfileRes } from '@ts/services/Auth';
import { create } from 'zustand'
import type { TAppStore } from './TAppStore'

export const useAppStore = create<TAppStore>((set) => ({
  loading: false,
  profile: null,

  setProfile: (data: IProfileRes) => set(() => ({ profile: { ...data } })),
  setLoading: (loading: boolean) => set(() => ({ loading }))
}))
