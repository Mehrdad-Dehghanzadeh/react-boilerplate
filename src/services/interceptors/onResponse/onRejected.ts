import { $t } from '@locales'
import { getNewToken, showPrompt } from '@/utils'
import { AxiosError } from 'axios'
import { axiosInstance } from '@/services/axios'

function handleAxiosError(error: AxiosError) {
  if (error.status && [403, '403'].includes(error.status)) {
    showPrompt({
      description: $t('errors.tokenExpire'),
      applyBtnTitle: $t('common.gotIt'),
      mutex: true,
      hideCancelBtn: true,
      applyCB() {
        history.back()
      }
    })
  }
}

export async function onRejectResponse(error: any): Promise<AxiosError> {
  if (error.status && [401, '401'].includes(error.status)) {
    const config = error.config
    await getNewToken()
    config._retryCount = 1
    return axiosInstance(config)
  }

  if (error instanceof AxiosError) {
    handleAxiosError(error)
  }

  return Promise.reject(error)
}
