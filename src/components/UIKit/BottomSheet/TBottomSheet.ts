import type { ComponentProps, PropsWithChildren } from 'react'

export type BottomSheetSize = 'md' | 'sm' | 'lg' | 'full' | 'auto'

export type BottomSheetProps = PropsWithChildren<ComponentProps<'div'>> & {
  open: boolean
  size?: BottomSheetProps
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  withHeader?: boolean
  preventClose?: boolean
}
