import type { InternalAxiosRequestConfig } from 'axios'
import { isProduction } from '@utils'
import { AUTH_TOKEN_KEY } from '@constants'

export function setToken(request: InternalAxiosRequestConfig) {
  if (isProduction()) {
    request.headers['Authorization'] = `JWT ${localStorage.getItem(AUTH_TOKEN_KEY)}`
  } else {
    const developToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoyNzExMjgzLCJhcHBfaWQiOjQwMjM2MTYsImRpc3RyaWJ1dGlvbl90eXBlIjo1MDAwLCJleHAiOjE3ODA0MDE5MjgsImhvc3RfaWQiOjMwOCwiaml0IjoiZDQyN2I1MmUtNzI4Ni00MzA2LTk3OGItZmMxNjAyOWRhZWFmIiwibW9iaWxlX25vIjoiMDkxOTA5NzAzMjUiLCJzdWJzY3JpcHRpb25fbWV0YSI6eyJoYXMiOmZhbHNlLCJpZCI6MCwic3Vic2NyaXB0aW9uX3JlY29yZCI6MCwiZGF0ZSI6IjAwMDEtMDEtMDFUMDM6MjU6NDQrMDM6MjUiLCJkdWUiOiIwMDAxLTAxLTAxVDAzOjI1OjQ0KzAzOjI1In19.LQxlEMKOf3CiFcVV0HN-QVXb4-bncB4N3QYlbuDGuvM'

    request.headers['Authorization'] = `JWT ${developToken}`
  }
}

export function onRequest(
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  setToken(request)

  return request
}
