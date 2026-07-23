import type { ComponentProps } from 'react'
import type { TInputProps } from '@ts/FormElements'

type TOmitted = 'size' | 'type'

export type TPriceFieldProps = Omit<ComponentProps<'input'>, TOmitted> &
  TInputProps & {
    type?: 'number' | 'text'
    suffix?: string
  }
