import type { ComponentProps, PropsWithChildren } from 'react'
import type { Colors } from '@ts/Colors'

export type Props = {
  color?: Colors | 'default'
}

export type TagProps = ComponentProps<'span'> & PropsWithChildren<Props>
