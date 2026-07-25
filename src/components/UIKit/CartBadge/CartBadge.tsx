import type { TCartBadgeProps } from './TCartBadge'
import { type FC } from 'react'
import clsx from 'clsx'
import { imgSrc } from '@utils'
import { BANKS_LIST } from '@constants'
import './CartBadge.scss'

export const CartBadge: FC<TCartBadgeProps> = ({
  cartNumber,
  className = '',
  size = 'md',
  ...props
}) => {
  const setIcon = (): string => {
    let val = ''
    const srt = String(cartNumber)
    const prefix = Number(srt.substring(0, 6))
    const item = BANKS_LIST.find((item) => item.preFix == prefix)

    if (item?.img) {
      val = item.img
    }

    return val
  }

  const icon = setIcon()

  return (
    <div className={clsx('cart-badge', `cart-badge--${size}`, className)} {...props}>
      <img className="cart-badge__img" src={imgSrc(`banks-logo/${icon}`)} />
    </div>
  )
}
