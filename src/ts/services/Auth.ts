import type { TRoles, TAccountItem } from '@ts/Common'

export interface ILoginPayload {
  mobile: string
}

export interface ILoginRes {
  session_id: string
  otp_length: number
}

export interface IVerifyPayload {
  session_id: string
  otp: string
}

export interface IVerifyRes {
  server_time: number
  access_token_duration: number
  refresh_token_duration: number
  access_token_expire: number
  refresh_token_expire: number
  access: string
  refresh: string
  mobile: string
  account_id: number
  session_id: number
  role: TRoles
  merchant_id: number
  branch_id: number
}

export interface IProfileRes {
  branch: {
    id: number
    created_at: string
    provider_id: number
    merchant_id: number
  } | null

  merchant: {
    id: number
    created_at: string
    provider_id: number
  } | null

  account: {
    id: number
    mobile: string
    created_at: string
    role: TRoles
    merchant_id: number
    branch_id: number
    first_name: string
    last_name: string
  }
}

export type IRefreshPayload = {
  refresh_token: string
}

export type IGetUserRes = {
  accounts: TAccountItem[]
}
