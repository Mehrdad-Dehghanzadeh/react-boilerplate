import type { ComponentProps, PropsWithChildren } from 'react'

export type TSVGsNOResultType = 'default' | 'cart' | 'report'
export type TProps = PropsWithChildren<{
  type?: TSVGsNOResultType
  title?: string
}>

export type TNoResultProps = ComponentProps<'div'> & TProps
