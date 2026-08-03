import type { InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, isAuthentication, getNewToken, deleteAllCookie } from '@utils'

export function setToken(request: InternalAxiosRequestConfig) {
  const accessToken = getAccessToken()

  if (isAuthentication()) {
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`
    } else {
      return getNewToken()
    }
  }
}

export async function onRequest(request: InternalAxiosRequestConfig) {
  try {
    await setToken(request)
  } catch (e) {
    deleteAllCookie()
  }

  return request
}
