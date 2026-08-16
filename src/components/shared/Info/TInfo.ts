import type { ComponentProps, ReactNode } from 'react'

export type TInfoProps = ComponentProps<'div'> & {
  title: ReactNode
  text: ReactNode
}
