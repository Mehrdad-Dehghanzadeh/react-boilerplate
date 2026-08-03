import type { InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, isAuthentication } from '@utils'

export function setToken(request: InternalAxiosRequestConfig) {
  const accessToken = getAccessToken()

  if (isAuthentication()) {
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`
    }
  }
}

export async function onRequest(request: InternalAxiosRequestConfig) {
  setToken(request)

  return request
}
