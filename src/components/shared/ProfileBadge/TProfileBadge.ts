import type { ComponentProps } from 'react'

export type TProfileBadgeProps = ComponentProps<'span'> & {
  name: string
  color?: 'primary' | 'secondary'
}
