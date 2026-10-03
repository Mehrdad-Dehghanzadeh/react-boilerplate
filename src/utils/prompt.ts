import type { PromptDetail } from '@Roots'

export const showPrompt = (detail: PromptDetail) => {
  const PromptEvent = new CustomEvent('showPrompt', { detail })
  const el = document.getElementById('prompt')
  el?.dispatchEvent(PromptEvent)
}
