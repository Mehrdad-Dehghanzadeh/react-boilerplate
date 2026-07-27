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
}

export type TSelectInputItem<T = any> = {
  title: string
  value: string | number | EmptyString
  itemData?: T
}

export type TSelectInputProps<TItem> = {
  fieldTextClassName?: ClassValue
  scrollTop?: number | 'middle' | 'quarterTop' | 'quarterBottom'
  itemHoc?: (item: TItem) => React.ReactNode
  textHoc?: (item: TItem) => React.ReactNode
  loading?: boolean
  noItemMessage?: string | React.ReactNode
}
