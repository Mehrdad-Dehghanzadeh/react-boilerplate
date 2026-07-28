import { type FC } from 'react'
import type { TProfileBadgeProps } from './TProfileBadge'
import clsx from 'clsx'
import './ProfileBadge.scss'

export const ProfileBadge: FC<TProfileBadgeProps> = ({
  color = 'primary',
  className = '',
  name,
  ...props
}) => {
  const naming = (): string => {
    const t = name[0]

    return t
  }

  return (
    <span
      className={clsx(['profile-badge', `profile-badge-${color}`], className)}
      {...props}
    >
      <span className="profile-badge__text">{naming()}</span>
    </span>
  )
}
