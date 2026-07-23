export type THomeContext = {
  birth_date: string
  is_active: boolean
  mobile: string
  national_code: string
  passport: string
  postal_code: string
}

export type TAppStoreState = {
  loading: boolean
  homeContext: THomeContext
}

export type TAppStore = TAppStoreState & {
  setHomeContext: (ctx: THomeContext) => void
  setLoading: (loading: boolean) => void
}
