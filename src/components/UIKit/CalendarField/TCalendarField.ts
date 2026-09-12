import type { TInputProps } from '@ts/FormElements'
import type { ComponentProps } from 'react'
import type { DayPickerProps } from '@daypicker/react'

type TOmitted = 'size' | 'type'
export type TCalendarField = Omit<ComponentProps<'input'>, TOmitted> &
  TInputProps & {
    pickerProps?: Omit<DayPickerProps, 'selected' | 'onSelect' | 'locale' | 'mode'>
    label?: string
  }
