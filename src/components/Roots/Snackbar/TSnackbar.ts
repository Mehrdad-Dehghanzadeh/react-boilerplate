import type { ReactElement } from 'react'

export type SnackbarType = 'error' | 'info' | 'success'

export type IconsSnackbar = Record<SnackbarType, ReactElement>

export type SnackbarDetails = {
  type?: SnackbarType
  message: string
}
