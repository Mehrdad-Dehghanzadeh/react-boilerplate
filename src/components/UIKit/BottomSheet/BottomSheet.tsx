import type { TBottomSheetProps } from './TBottomSheet'
import { type FC } from 'react'
import { createPortal } from 'react-dom'
import Cross from '@assets/svg/cross.svg?react'
import clsx from 'clsx'
import { useDialog } from '@hooks/useDialog'
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
  const { root, show, close } = useDialog({ idRoot: 'bottom-sheet-root', open, setOpen })

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
