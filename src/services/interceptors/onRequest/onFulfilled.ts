import type { InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, isAuthentication } from '@utils'

export function setToken(request: InternalAxiosRequestConfig) {
  const accessToken = getAccessToken()

  if (isAuthentication() && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }
}

export function onRequest(
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  setToken(request)

  return request
}
