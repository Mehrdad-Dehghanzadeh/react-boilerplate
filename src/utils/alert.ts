import type { TAlert } from '@Roots'

export function showAlert(detail: TAlert) {
  const PromptEvent = new CustomEvent('showAlert', { detail })
  const el = document.getElementById('alert')
  el?.dispatchEvent(PromptEvent)
}
