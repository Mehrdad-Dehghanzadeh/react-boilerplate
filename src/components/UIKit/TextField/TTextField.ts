import type { ComponentProps } from 'react'
import type { TInputProps } from '@ts/FormElements'

type TOmitted = 'size' | 'type'

export type TTextFieldProps = Omit<ComponentProps<'input'>, TOmitted> &
  TInputProps & {
    type?: 'number' | 'text' | 'tel' | 'email' | 'url'
    suffix?: string | number
    convertValue?: (val: string) => string
  }
