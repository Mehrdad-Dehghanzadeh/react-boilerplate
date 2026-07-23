import type { ComponentProps } from 'react'

export type TCartBadgeProps = ComponentProps<'div'> & {
  cartNumber: string | number
  size?: 'md' | 'sm'
}
