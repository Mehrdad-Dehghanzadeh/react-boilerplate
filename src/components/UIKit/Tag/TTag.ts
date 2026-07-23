import type { ComponentProps, PropsWithChildren } from 'react'
import type { TColor } from '@ts/Colors'

export type TProps = {
  color?: TColor | 'default'
}

export type TTagProps = ComponentProps<'span'> & PropsWithChildren<TProps>
