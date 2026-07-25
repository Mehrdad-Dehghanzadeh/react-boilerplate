import { useEffect, type FC } from 'react'
import { useRootPopUp } from '@hooks'
import type { TSnackbarDetails, TIcons } from './TSnackbar'
import clsx from 'clsx'
import CrossCircle from '@assets/svg/cross-circle.svg?react'
import Info from '@assets/svg/info.svg?react'
import CheckCircle from '@assets/svg/check-circle.svg?react'
import './Snackbar.scss'

export const Snackbar: FC = () => {
  const { detail, show, elRef, setShow } = useRootPopUp<TSnackbarDetails>({
    eventName: 'showSnackbar',
    defaultDetails: { type: 'error' }
  })

  const mapIcon = () => {
    const icons: TIcons = {
      error: <CrossCircle className="snackbar__icon" />,
      success: <CheckCircle className="snackbar__icon" />,
      info: <Info className="snackbar__icon" />
    }

    return detail?.type ? icons[detail.type] : null
  }

  const Icon = mapIcon()

  const handleShow = () => {
    if (show) {
      setTimeout(() => {
        setShow(false)
      }, 6000)
    }
  }

  useEffect(() => {
    handleShow()
  }, [show])

  return (
    <div
      id="snackbar"
      className={clsx('snackbar', detail?.type ? `snackbar-${detail?.type}` : '', {
        'snackbar--show': show
      })}
      ref={elRef}
    >
      {Icon}
      {Boolean(detail?.message) && <p>{detail?.message || ''}</p>}
    </div>
  )
}
