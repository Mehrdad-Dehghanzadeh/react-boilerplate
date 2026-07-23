import type { TTagProps } from './TTag'
import { type FC } from 'react'
import clsx from 'clsx'
import './Tag.scss'

export const Tag: FC<TTagProps> = ({
  color = 'default',
  className = '',
  children,
  ...props
}) => {
  return (
    <span className={clsx(['tag', `tag-${color}`, className])} {...props}>
      <span className="tag__content">{children}</span>
    </span>
  )
}
