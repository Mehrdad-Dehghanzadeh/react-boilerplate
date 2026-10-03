import type { ComponentProps } from 'react'
import type { InputProps } from '@ts/FormElements'

type Omitted = 'size' | 'type'

export type RangeFieldProps = Omit<ComponentProps<'input'>, Omitted> &
  InputProps & {
    step?: number
    maxValue?: number
    minValue?: number
    valueUnit?: string
    changeCallBack?: (value: any) => void
  }
