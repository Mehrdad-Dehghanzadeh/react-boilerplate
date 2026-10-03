import type { ComponentProps, ReactNode } from 'react'

export type DetailedCardProps = ComponentProps<'dl'> & {
  title: string | ReactNode
  text: string | ReactNode
}
