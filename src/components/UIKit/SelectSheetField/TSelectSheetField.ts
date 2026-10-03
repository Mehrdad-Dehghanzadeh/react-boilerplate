import type { ComponentProps } from 'react'
import type { InputProps, SelectInputProps } from '@ts/FormElements'

export type SelectSheetItem<T = any> = SelectInputItem<T>

export type SelectSheetItems<T = any> = SelectSheetItem<T>[]

export type SelectSheetFieldProps = ComponentProps<'select'> &
  SelectInputProps<SelectSheetItem> &
  InputProps & {
    items?: SelectSheetItems
    title?: string
    noItemsAction?: () => void
  }
