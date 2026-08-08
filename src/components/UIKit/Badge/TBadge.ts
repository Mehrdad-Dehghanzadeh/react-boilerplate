import type { TColor } from '@ts/Colors';
import type { ComponentProps, ReactNode } from 'react';

export type TBadgeProps = ComponentProps<'span'> & {
  content: ReactNode
  color?: TColor
  size: 'sm' | 'md' | 'xs' | 'lg'
}
