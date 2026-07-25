import type { TNoResultProps, TSVGsNOResultType } from './TNoResult'
import { type FC, type ReactNode } from 'react'
import clsx from 'clsx'
import NoResultSvg from '@assets/svg/no-result.svg?react'
import NoCartSvg from '@assets/svg/no-carts-result.svg?react'
import './NoResult.scss'

export const NoResult: FC<TNoResultProps> = ({
  type = 'default',
  className = '',
  title,
  children,
  ...props
}) => {
  const mapSvgIcon = () => {
    const svgIcons: Record<TSVGsNOResultType, ReactNode> = {
      cart: <NoCartSvg className="no-result__icon" />,
      report: <NoResultSvg className="no-result__icon" />,
      default: null
    }

    return svgIcons[type]
  }

  const svgIcon = mapSvgIcon()

  return (
    <div className={clsx('no-result', className)} {...props}>
      {svgIcon}
      {Boolean(title) && <h2 className="no-result__title">{title}</h2>}
      {children}
    </div>
  )
}
