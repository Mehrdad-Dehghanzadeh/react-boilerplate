import type { ComponentProps } from 'react'
import type { TInputProps, TSelectInputProps, TSelectInputItem } from '@ts/FormElements'

export type TDomRect = {
  width: string
  top: string
  left: string
}

export type TSelectOptionItem<T = any> = TSelectInputItem<T>

export type TSelectOptions<T = any> = TSelectOptionItem<T>[]

export type TSelectMultiFieldProps = ComponentProps<'input'> &
  TSelectInputProps<TSelectOptionItem> &
  TInputProps & {
    options?: TSelectOptions
    menuFill?: boolean
    openBottom?: boolean
    inputLabel?: string
  }
