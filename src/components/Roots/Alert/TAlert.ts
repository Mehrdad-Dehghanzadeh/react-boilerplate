export type AlertTypes = 'success' | 'warring' | 'error'

export type AlertDetails = {
  message: string
  type?: AlertTypes
  btnTitle?: string
  hideBtn?: boolean
  btnCb?: () => void
}
