import { $t } from '@locales'
import { showPrompt } from '@/utils'
import { AxiosError } from 'axios'

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

export function onRejectResponse(error: AxiosError): Promise<AxiosError> {
  if (error instanceof AxiosError) {
    handleAxiosError(error)
  }

  return Promise.reject(error)
}
