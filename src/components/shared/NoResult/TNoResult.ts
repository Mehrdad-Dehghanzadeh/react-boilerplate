import type { ComponentProps, PropsWithChildren } from 'react'

export type SVGsNOResultType = 'default' | 'cart' | 'report'
export type Props = PropsWithChildren<{
  type?: SVGsNOResultType
  title?: string
}>

export type NoResultProps = ComponentProps<'div'> & Props
