import type { TSelectiveCardProps } from './TSelectiveCard'
import { type FC } from 'react'
import clsx from 'clsx'
import './SelectiveCard.scss'

export const SelectiveCard: FC<TSelectiveCardProps> = ({
  title,
  description = '',
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('selective-card', className)} role="radio" {...props}>
      <p className="selective-card__title">{title}</p>
      <p className="selective-card__description">{description}</p>
    </div>
  )
}
