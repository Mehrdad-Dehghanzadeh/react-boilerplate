export type TAlertTypes = 'success' | 'warring' | 'error'

export type TAlert = {
  message: string
  type?: TAlertTypes
  btnTitle?: string
  hideBtn?: boolean
  btnCb?: () => void
}
