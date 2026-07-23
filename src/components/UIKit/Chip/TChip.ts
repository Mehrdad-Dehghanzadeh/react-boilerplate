import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import type { TColor } from '@ts/Colors'

export type TChipVariants = 'solid' | 'outlined' | 'border-gr'

export type TChipProps = ComponentProps<'span'> &
  PropsWithChildren<{
    variant?: TChipVariants
    color?: TColor | 'default'
    icon?: ReactNode
    iconClassName?: string
    childrenClassName?: string
    dense?: boolean
    size?: 'md' | 'sm' | 'lg' | 'fit' | 'full'
  }>
