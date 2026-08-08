import { type FC } from 'react'
import type { TBadgeProps } from './TBadge'
import clsx from 'clsx'
import './Badge.scss'

export const Badge: FC<TBadgeProps> = ({
  content,
  size = 'md',
  color = 'primary',
  className = ''
}) => {
  return (
    <span className={clsx(`badge badge-${size} badge-${color}`, className)} role="status">
      <span className="badge__content">{content}</span>
    </span>
  )
}
