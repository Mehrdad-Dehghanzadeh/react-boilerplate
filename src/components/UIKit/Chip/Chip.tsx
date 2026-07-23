import { type FC } from 'react'
import type { TChipProps } from './TChip'
import clsx from 'clsx'
import './Chip.scss'

export const Chip: FC<TChipProps> = ({
  children,
  icon,
  iconClassName = '',
  childrenClassName = '',
  className = '',
  color = 'default',
  size = 'md',
  variant = 'solid',
  dense = false,
  ...props
}) => {
  return (
    <span
      className={clsx([
        className,
        'chip',
        `chip-${variant}`,
        `chip-${size}`,
        `${color ? 'chip-' + color : ''}`,
        { 'chip--dense': dense }
      ])}
      {...props}
    >
      {Boolean(icon) && <span className={clsx('chip__icon', iconClassName)}>{icon}</span>}
      <span className={clsx('chip__content', childrenClassName)}>{children}</span>
    </span>
  )
}
