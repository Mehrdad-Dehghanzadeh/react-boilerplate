import type { TBottomSheetProps } from './TBottomSheet'
import { type FC, useEffect, useDeferredValue } from 'react'
import { createPortal } from 'react-dom'
import Cross from '@assets/svg/cross.svg?react'
import clsx from 'clsx'
import { BODY_DIALOG_OPEN_CLASS_NAME } from '@constants'
import './BottomSheet.scss'

export const BottomSheet: FC<TBottomSheetProps> = ({
  open,
  setOpen,
  children,
  size = 'auto',
  title = '',
  preventClose = false,
  withHeader = false,
  className = ''
}) => {
  const root = document.getElementById('bottom-sheet-root') as HTMLElement

  const show = useDeferredValue(open)

  const close = () => {
    setOpen?.(false)
    document.body.classList.remove(BODY_DIALOG_OPEN_CLASS_NAME)
  }

  const toggleClassNameBody = () => {
    if (open) {
      document.body.classList.add(BODY_DIALOG_OPEN_CLASS_NAME)
    } else {
      document.body.classList.remove(BODY_DIALOG_OPEN_CLASS_NAME)
    }
  }

  useEffect(() => {
    toggleClassNameBody()
  }, [open])

  return (
    show &&
    createPortal(
      <div
        className={clsx([
          'bottom-sheet',
          `bottom-sheet-${size}`,
          { 'bottom-sheet--open': open }
        ])}
      >
        <div
          className="bottom-sheet__overlay"
          onClick={preventClose ? () => null : close}
        ></div>

        <div className={clsx('bottom-sheet__container', className)}>
          {Boolean(title || withHeader) && (
            <div className="bottom-sheet__header">
              <strong className="bottom-sheet__title">{title}</strong>
              <Cross className="bottom-sheet__close" onClick={close} />
            </div>
          )}

          <div className="bottom-sheet__body">{children}</div>
        </div>
      </div>,
      root
    )
  )
}
