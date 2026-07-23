import type { ComponentProps } from 'react'
import type { TInputProps, TSelectInputProps, TSelectInputItem } from '@ts/FormElements'

export type TSelectSheetItem<T = any> = TSelectInputItem<T>

export type TSelectSheetItems<T = any> = TSelectSheetItem<T>[]

export type TSelectSheetFieldProps = ComponentProps<'select'> &
  TSelectInputProps<TSelectSheetItem> &
  TInputProps & {
    items?: TSelectSheetItems
    title?: string
    noItemsAction?: () => void
  }
