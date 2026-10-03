import type { ComponentProps } from 'react'

export type CartBadgeProps = ComponentProps<'div'> & {
  cartNumber: string | number
  size?: 'md' | 'sm'
}
