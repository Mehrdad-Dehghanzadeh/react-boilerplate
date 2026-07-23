import type { TDetailedCardProps } from './TDetailedCard'
import type { FC } from 'react'
import clsx from 'clsx'
import './DetailedCard.scss'

export const DetailedCard: FC<TDetailedCardProps> = ({
  className = '',
  title,
  text,
  ...props
}) => {
  return (
    <dl className={clsx('detailed-card', className)} {...props}>
      <dt className="detailed-card__title">{title}</dt>
      <dd className="detailed-card__text">{text}</dd>
    </dl>
  )
}
