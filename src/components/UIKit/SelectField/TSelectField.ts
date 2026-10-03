import type { ComponentProps } from 'react'
import type { InputProps, SelectInputProps } from '@ts/FormElements'

export type DomRect = {
  width: string
  top: string
  left: string
}

export type SelectOptionItem<T = any> = SelectInputItem<T>

export type SelectOptions<T = any> = SelectOptionItem<T>[]

export type SelectFieldProps = ComponentProps<'select'> &
  SelectInputProps<SelectOptionItem> &
  InputProps & {
    options?: SelectOptions
    menuFill?: boolean
    openBottom?: boolean
  }
