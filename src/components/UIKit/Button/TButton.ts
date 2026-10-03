import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import type { Colors } from '@ts/Colors'

export type TVariantBtn = 'outlined'

type Props = {
  color?: Colors | EmptyString
  size?: 'md' | 'sm' | 'lg'
  loading?: boolean
  variant?: TVariantBtn
  icon?: ReactNode
  dense?: boolean
  curve?: boolean
}

export type TButtonProps = ComponentProps<'button'> & PropsWithChildren<Props>
