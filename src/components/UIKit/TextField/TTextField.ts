import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'

type Omitted = 'size' | 'type'

export type TextFieldProps = Omit<ComponentProps<'input'>, Omitted> &
  InputProps & {
    type?: 'number' | 'text' | 'tel' | 'email' | 'url'
    suffix?: string | number
    convertValue?: (val: string) => string
  }
