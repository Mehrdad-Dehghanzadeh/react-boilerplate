import { $t } from '@locales'
import { isJsonString } from '@utils'
import { type AxiosResponse, AxiosError } from 'axios'

type TResponse = AxiosResponse<IResponse | IResponseRaw>

function parsePayloadJSON(response: TResponse) {
  if (isJsonString(response?.data?.payload as string)) {
    response.data.payload = JSON.parse(response.data.payload)
  }
}

function createError(response: TResponse): Promise<AxiosError> {
  response.status = 400
  response.statusText = 'Bad Request'

  const message = response?.data?.status_message || $t('errors.apiProblem')
  const code = String(response?.data?.status_code || 1000)

  const instanceError = new AxiosError(
    message,
    code,
    response.config,
    response.request,
    response
  )

  return Promise.reject(instanceError)
}

export function onResponse(response: TResponse): TResponse | Promise<any> {
  parsePayloadJSON(response)

  return response?.data?.status_code == 0 ? response : createError(response)
}
