import type { ComponentProps } from 'react'
import type { TInputProps } from '@ts/FormElements'

type TOmitted = 'size' | 'type'

export type TRangeFieldProps = Omit<ComponentProps<'input'>, TOmitted> &
  TInputProps & {
    step?: number
    maxValue?: number
    minValue?: number
    valueUnit?: string
    changeCallBack?: (value: any) => void
  }
