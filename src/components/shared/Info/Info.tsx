import { type FC } from 'react'
import type { TInfoProps } from './TInfo'
import { clsx } from 'clsx'

export const Info: FC<TInfoProps> = ({ title = '', text = '', className = '' }) => {
  return (
    <div className={clsx('info', className)}>
      <div className="info__title">
        <span className="sc-interp">{title}</span>
      </div>

      <div className="info__text">
        <span className="sc-interp">{text}</span>
      </div>
    </div>
  )
}
