import type { TAlert, TAlertTypes } from './TAlert'
import { useMemo, type FC, type ReactNode } from 'react'
import clsx from 'clsx'
import { BottomSheet, Button } from '@UIKit'
import { useRootPopUp } from '@hooks'
import { $t } from '@locales'
import CheckIcon from '@assets/svg/check-circle.svg?react'
import InfoIcon from '@assets/svg/info-rec.svg?react'
import CrossIcon from '@assets/svg/cross-octagon.svg?react'
import './Alert.scss'

export const Alert: FC = () => {
  const { detail, show, elRef, setShow } = useRootPopUp<TAlert>({
    eventName: 'showAlert',
    defaultDetails: { type: 'error' }
  })

  const icon = useMemo<ReactNode | null>(() => {
    const icons: Record<TAlertTypes, ReactNode> = {
      error: <CrossIcon className="alert__icon alert__icon--error" />,
      warring: <InfoIcon className="alert__icon alert__icon--warring" />,
      success: <CheckIcon className="alert__icon alert__icon--success" />
    }

    return detail?.type ? icons[detail?.type] : null
  }, [detail])

  const close = () => {
    detail?.btnCb?.()
    setShow(false)
  }

  return (
    <div id="alert" className={clsx('alert', { 'alert--show': show })} ref={elRef}>
      <BottomSheet open={show} setOpen={setShow}>
        {show && (
          <div className={clsx('alert', { 'alert--show': show })}>
            {icon}
            {Boolean(detail?.message) && <p className="alert__text">{detail?.message}</p>}

            {Boolean(!detail?.hideBtn) && (
              <Button variant="outlined" color="white" className="mt-6" onClick={close}>
                {detail?.btnTitle || $t('common.gotIt')}
              </Button>
            )}
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
