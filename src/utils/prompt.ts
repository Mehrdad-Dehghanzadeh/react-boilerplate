import type { TPromptDetail } from '@Roots'

export const showPrompt = (detail: TPromptDetail) => {
  const PromptEvent = new CustomEvent('showPrompt', { detail })
  const el = document.getElementById('prompt')
  el?.dispatchEvent(PromptEvent)
}
