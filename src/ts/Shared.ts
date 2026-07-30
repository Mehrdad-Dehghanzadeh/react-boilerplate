import type { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'

export type TDialogSize = 'md' | 'sm' | 'lg' | 'full' | 'auto'

export type TDialogProps = ComponentProps<'div'> & {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  size?: TDialogSize
  title?: ReactNode
  withHeader?: boolean
  preventClose?: boolean
}
