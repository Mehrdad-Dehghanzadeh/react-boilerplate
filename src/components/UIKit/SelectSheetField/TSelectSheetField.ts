import type { ComponentProps } from 'react'
import type { TInputProps, TSelectInputProps, TSelectInputItem } from '@ts/FormElements'

export type TSelectSheetFieldProps<T = any> = ComponentProps<'select'> &
  TSelectInputProps<T> &
  TInputProps & {
    title?: string
    noItemsAction?: () => void
  }
