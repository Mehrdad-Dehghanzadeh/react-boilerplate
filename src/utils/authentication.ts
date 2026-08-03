import { apis } from '@services'
import type { IVerifyRes } from '@ts/services/Auth'
import Cookies from 'js-cookie'

export function isAuthentication(): boolean {
  const refreshToken = Cookies.get('refresh_token')

  return Boolean(refreshToken)
}

export function setRefreshToken(expires: number, value: string): void {
  Cookies.set('refresh_token', value, { expires: new Date(expires * 1000) })
}

export function getRefreshToken(): string | undefined {
  return Cookies.get('refresh_token')
}

export function setAccessToken(expires: number, value: string): void {
  Cookies.set('access_token', value, { expires: new Date(expires * 1000) })
}

export function getAccessToken(): string | undefined {
  return Cookies.get('access_token')
}

export function setUserCookie(resData: IVerifyRes): void {
  const value = JSON.stringify({
    branch_id: resData?.branch_id ?? null,
    merchant_id: resData?.merchant_id ?? null,
    mobile: resData?.mobile || null,
    server_time: resData?.server_time || null,
    session_id: resData?.session_id ?? null,
    role: resData?.role ?? null,
    account_id: resData?.account_id || null
  })

  Cookies.set('user_data', value, {
    expires: new Date(resData?.access_token_expire * 1000)
  })
}

export function deleteAllCookie() {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  Cookies.remove('user_data')
}

export async function updateAccessToken(resData: IVerifyRes) {
  await Cookies.remove('access_token')
  await Cookies.remove('user_data')
  await setAccessToken(resData?.access_token_expire, resData?.access)
  await setUserCookie(resData)
}

export function getNewToken() {
  return new Promise((resolve, reject) => {
    const refresh_token = getRefreshToken()

    if (refresh_token) {
      apis.auth
        .refresh({ refresh_token })
        .then((res) => {
          updateAccessToken(res?.data?.payload?.data)
          resolve(res?.data?.payload?.data)
        })
        .catch((e) => {
          reject(e)
        })
    } else {
      reject(new Error('refresh token not found'))
    }
  })
}
