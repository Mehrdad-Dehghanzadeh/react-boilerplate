import type { TDropBoxProps, TTypeDropBox } from './TDropBox'
import { useMemo, type FC } from 'react'
import clsx from 'clsx'
import CrossIcon from '@assets/svg/cross-fill.svg?react'
import InfoIcon from '@assets/svg/info-rec.svg?react'
import CheckIcon from '@assets/svg/check-circle.svg?react'
import './DropBox.scss'

export const DropBox: FC<TDropBoxProps> = ({
  children,
  show,
  type = 'error',
  text = '',
  className = '',
  ...props
}) => {
  const icon = useMemo(() => {
    const icons: Record<TTypeDropBox, React.ReactNode> = {
      error: <CrossIcon className="drop-box__icon" />,
      success: <CheckIcon className="drop-box__icon" />,
      info: <InfoIcon className="drop-box__icon" />
    }

    return icons[type]
  }, [type])

  return (
    <div
      className={clsx(
        'drop-box',
        `drop-box-${type}`,
        { 'drop-box--show': show },
        className
      )}
      {...props}
    >
      {icon}
      <p className="drop-box__text">{children || text}</p>
    </div>
  )
}
