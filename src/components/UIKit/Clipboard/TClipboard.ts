import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import type { ClassValue } from 'clsx'

export type TClipboardProps = PropsWithChildren<
  ComponentProps<'span'> & {
    value: string
    icon?: ReactNode
    iconClassName?: ClassValue
    contentClassName?: ClassValue
  }
>
