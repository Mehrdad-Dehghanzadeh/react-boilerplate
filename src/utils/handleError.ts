import { AxiosError } from 'axios'
import { $t } from '@locales'
import { showSnackbar } from './snackbar'

export function handleResponseError(e: unknown) {
  if (e instanceof AxiosError) {
    const message = e?.response?.data?.status_message || $t('errors.apiProblem')
    showSnackbar({ type: 'error', message })
  }
}
