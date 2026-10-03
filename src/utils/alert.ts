import type { AlertDetails } from '@Roots'

export function showAlert(detail: AlertDetails) {
  const PromptEvent = new CustomEvent('showAlert', { detail })
  const el = document.getElementById('alert')
  el?.dispatchEvent(PromptEvent)
}
