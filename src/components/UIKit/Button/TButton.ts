import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import type { TColor } from '@ts/Colors'

export type TVariantBtn = 'outlined'

type TProps = {
  color?: TColor | EmptyString
  size?: 'md' | 'sm' | 'lg'
  loading?: boolean
  variant?: TVariantBtn
  icon?: ReactNode
  dense?: boolean
  curve?: boolean
}

export type TButtonProps = ComponentProps<'button'> & PropsWithChildren<TProps>
