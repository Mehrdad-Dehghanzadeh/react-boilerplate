import type { ComponentProps, PropsWithChildren } from 'react'

export type TTypeDropBox = 'error' | 'info' | 'success'

type TProps = PropsWithChildren<{
  show: boolean
  text?: string
  type?: TTypeDropBox
}>

export type TDropBoxProps = ComponentProps<'div'> & TProps
