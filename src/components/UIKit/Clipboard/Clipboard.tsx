import { type FC } from 'react'
import type { TClipboardProps } from './TClipboard'
import clsx from 'clsx'
import ClipboardIcon from '@assets/svg/copy.svg?react'
import { copyText, showSnackbar } from '@utils'
import './Clipboard.scss'

export const Clipboard: FC<TClipboardProps> = ({
  className = '',
  iconClassName = '',
  contentClassName = '',
  icon = <ClipboardIcon />,
  value,
  children
}) => {
  const action = () => {
    copyText(value)
    showSnackbar({type: 'success', message: 'کپی شد !'})
  }
  return (
    <span className={clsx('clipboard', className)} onClick={action}>
      <span className={clsx('clipboard__content', contentClassName)}> {children}</span>
      <span className={clsx('clipboard__icon', iconClassName)}>{icon}</span>
    </span>
  )
}
