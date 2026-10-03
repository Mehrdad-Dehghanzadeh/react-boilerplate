import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import type { Colors } from '@ts/Colors'

export type ChipVariants = 'solid' | 'outlined' | 'border-gr'

export type ChipProps = ComponentProps<'span'> &
  PropsWithChildren<{
    variant?: ChipVariants
    color?: Colors | 'default'
    icon?: ReactNode
    iconClassName?: string
    childrenClassName?: string
    dense?: boolean
    size?: 'md' | 'sm' | 'lg' | 'fit' | 'full'
  }>
