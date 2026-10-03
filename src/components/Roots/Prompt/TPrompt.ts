export type PromptDetail = {
  title?: string
  applyBtnTitle?: string
  cancelBtnTitle?: string
  description?: string
  cancelCB?: () => any
  applyCB?: () => any
  hideCancelBtn?: boolean
  loading?: boolean
  mutex?: boolean
}
