import type { SnackbarDetails } from '@Roots'

export function showSnackbar(detail: SnackbarDetails) {
  const SnackbarEvent = new CustomEvent('showSnackbar', { detail })
  const el = document.getElementById('snackbar')
  el?.dispatchEvent(SnackbarEvent)
}
