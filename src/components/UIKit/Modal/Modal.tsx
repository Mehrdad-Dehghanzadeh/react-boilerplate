import type { TModalProps } from './TModal'
import { type FC } from 'react'
import { createPortal } from 'react-dom'
import { useDialog } from '@hooks'
import clsx from 'clsx'
import Cross from '@assets/svg/cross.svg?react'
import './Modal.scss'

export const Modal: FC<TModalProps> = ({
  className = '',
  size = 'md',
  children,
  open,
  setOpen,
  preventClose,
  title,
  withHeader,
  ...props
}) => {
  const { root, show, close } = useDialog({ idRoot: 'modal-root', open, setOpen })

  return (
    show &&
    createPortal(
      <div className={clsx(['modal', `modal-${size}`, { 'modal--open': open }])}>
        <div className="modal__overlay" onClick={preventClose ? () => null : close}></div>

        <div className={clsx('modal__container', className)} {...props}>
          {Boolean(title || withHeader) && (
            <div className="modal__header">
              <strong className="modal__title">{title}</strong>
              <div className="modal__close" onClick={close}>
                <Cross className="modal__close-icon" />
              </div>
            </div>
          )}

          <div className="modal__body">{children}</div>
        </div>
      </div>,
      root
    )
  )
}
