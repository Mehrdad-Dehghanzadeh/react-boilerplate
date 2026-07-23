import type { ComponentProps, ReactNode } from 'react'

export type TDetailedCardProps = ComponentProps<'dl'> & {
  title: string | ReactNode
  text: string | ReactNode
}
