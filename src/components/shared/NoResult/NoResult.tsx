import type { TNoResultProps, TSVGsNOResultType } from './TNoResult'
import { type FC, useMemo } from 'react'
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
  const svgs: Record<TSVGsNOResultType, any> = {
    cart: <NoCartSvg className="no-result__icon" />,
    report: <NoResultSvg className="no-result__icon" />,
    default: null
  }
  const svgIcon = useMemo<any>(() => svgs[type], [type])
  return (
    <div className={clsx('no-result', className)} {...props}>
      {svgIcon}
      {Boolean(title) && <h2 className="no-result__title">{title}</h2>}
      {children}
    </div>
  )
}
