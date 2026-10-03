import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'

type Omitted = 'size' | 'type' | 'inputMode'

export type CartNumberFieldProps = Omit<ComponentProps<'input'>, Omitted> &
  InputProps & {}
