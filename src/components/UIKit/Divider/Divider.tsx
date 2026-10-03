import { type FC } from 'react'
import type { DividerProps } from './TDivider'
import clsx from 'clsx'
import './Divider.scss'

export const Divider: FC<DividerProps> = ({ className = '', ...props }) => {
  return <hr className={clsx('divider', className)} />
}
