import type { TWallet } from "@ts/Wallets"

export interface IUpdateUserKYC {
  national_code: string
  birthdate: string
}
export interface IUserDataServices {
  wallets: {
    data: {
    wallets: TWallet[]
  }}
  active: boolean
  kyc: boolean
}
