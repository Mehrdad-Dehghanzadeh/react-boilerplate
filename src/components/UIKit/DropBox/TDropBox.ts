import type { ComponentProps, PropsWithChildren } from 'react'

export type TypeDropBox = 'error' | 'info' | 'success'

type Props = PropsWithChildren<{
  show: boolean
  text?: string
  type?: TypeDropBox
}>

export type DropBoxProps = ComponentProps<'div'> & Props
