import type { ComponentProps, PropsWithChildren } from 'react'

export type TBottomSheetSize = 'md' | 'sm' | 'lg' | 'full' | 'auto'

export type TBottomSheetProps = PropsWithChildren<ComponentProps<'div'>> & {
  open: boolean
  size?: TBottomSheetProps
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  withHeader?: boolean
  preventClose?: boolean
}
