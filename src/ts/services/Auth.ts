import type { TRoles } from "@ts/Common";

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
