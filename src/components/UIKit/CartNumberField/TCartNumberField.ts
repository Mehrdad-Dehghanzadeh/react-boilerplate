import type { ComponentProps } from 'react'
import type { TInputProps } from '@ts/FormElements'

type TOmitted = 'size' | 'type' | 'inputMode'

export type TCartNumberFieldProps = Omit<ComponentProps<'input'>, TOmitted> & TInputProps & {}
