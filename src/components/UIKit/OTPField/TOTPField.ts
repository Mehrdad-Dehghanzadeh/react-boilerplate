import type { ComponentProps } from 'react'
import type { TInputProps } from '@ts/FormElements'

export type TOTPFieldProps = Omit<ComponentProps<'input'>, 'size'> &
  TInputProps & {
    length?: number
  }
