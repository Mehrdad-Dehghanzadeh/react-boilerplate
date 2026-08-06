import type { ComponentProps, ReactNode } from 'react'

export type TSelectiveCardProps = ComponentProps<'div'> & {
  title: ReactNode
  description?: ReactNode
}
