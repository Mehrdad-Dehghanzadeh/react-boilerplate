import type { IProfileRes } from "@ts/services/Auth";

export type TAppStoreState = {
  loading: boolean
  profile: IProfileRes | null
}

export type TAppStore = TAppStoreState & {
  setProfile: (profileData: IProfileRes) => void
  setLoading: (loading: boolean) => void
}
