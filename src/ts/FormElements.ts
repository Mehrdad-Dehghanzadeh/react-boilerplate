import type { Control, RegisterOptions } from 'react-hook-form'
import type { ClassValue } from 'clsx'
import type { FunctionComponent, ReactNode, SVGProps } from 'react'

export type TSvgIcon = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
  }
>

export type TInputProps = {
  control: any
  name: string
  rules?: Omit<
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  helperText?: string
  helperCb?: (filedValue: string | number) => string
  label?: string
  classNameControl?: string
  clearable?: boolean
  clearCb?: () => void
  prefixIcon?: ReactNode
  ltr?: boolean
  dense?: boolean
}

export type TSelectInputItem<T = any> = {
  title: string
  value: string | number | EmptyString | boolean
  itemData?: T
}

export type TScrollTop = number | 'middle' | 'quarterTop' | 'quarterBottom'

export type TSelectInputProps<T = any> = {
  options: TSelectOptions<T>
  fieldTextClassName?: ClassValue
  scrollTop?: TScrollTop
  itemHoc?: (item: TSelectOption<T>) => React.ReactNode
  textHoc?: (item: TSelectOption<T>) => React.ReactNode
  loading?: boolean
  noItemMessage?: string | React.ReactNode
}

export type TDomRect = {
  width: string
  top: string
  left: string
}
