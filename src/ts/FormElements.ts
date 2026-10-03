import type { Control, RegisterOptions } from 'react-hook-form'
import type { ClassValue } from 'clsx'

export type InputProps = {
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
  ltr?: boolean
}


export type SelectInputProps<TItem> = {
  fieldTextClassName?: ClassValue
  scrollTop?: number | 'middle' | 'quarterTop' | 'quarterBottom'
  itemHoc?: (item: TItem) => React.ReactNode
  textHoc?: (item: TItem) => React.ReactNode
  loading?: boolean
  noItemMessage?: string | React.ReactNode
}
