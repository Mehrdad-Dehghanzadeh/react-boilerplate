import type { ComponentProps, Ref } from 'react'
import type { TInputProps } from '@ts/FormElements'

export type OTPRef = {clearValue: () => void}

export type TOTPFieldProps = Omit<ComponentProps<'input'>, 'size' | 'ref'> &
  TInputProps & {
    length?: number
    ref?: Ref<OTPRef>
  }
