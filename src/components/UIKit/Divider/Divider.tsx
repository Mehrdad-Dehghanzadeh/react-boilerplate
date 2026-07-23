import { type FC } from 'react'
import type { TDividerProps } from './TDivider'
import clsx from 'clsx'
import './Divider.scss'

export const Divider: FC<TDividerProps> = ({ className = '', ...props }) => {
  return <hr className={clsx('divider', className)} />
}
