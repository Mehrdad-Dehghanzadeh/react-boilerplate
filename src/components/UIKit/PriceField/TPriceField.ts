import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'

type Omitted = 'size' | 'type'

export type PriceFieldProps = Omit<ComponentProps<'input'>, Omitted> &
  InputProps & {
    type?: 'number' | 'text'
    suffix?: string
  }
