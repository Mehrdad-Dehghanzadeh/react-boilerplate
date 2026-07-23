import { AxiosError } from 'axios'

export function onRejectedRequest(error: AxiosError | Error ):Promise<AxiosError> {
  return Promise.reject(error)
}
