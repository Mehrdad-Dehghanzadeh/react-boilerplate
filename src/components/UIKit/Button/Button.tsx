import type { TButtonProps } from './TButton'
import { type FC } from 'react'
import clsx from 'clsx'
import SpinnerSVG from '@assets/svg/spinner.svg?react'
import './Button.scss'

export const Button: FC<TButtonProps> = ({
  children,
  loading,
  icon,
  disabled,
  className = '',
  color = 'green',
  size = '',
  variant = '',
  dense = false,
  curve = false,
  ...props
}) => {
  const variantClassNaming = () => {
    return variant && `button-${variant}`
  }

  const sizeClassNaming = () => {
    return size && `button-${size}`
  }

  const variantClassName = variantClassNaming()
  const sizeClassName: string = sizeClassNaming()

  return (
    <button
      className={clsx(
        ['button', `button-${color}`, variantClassName, sizeClassName, className],
        {
          'button--loading': loading,
          'button--dense': dense,
          'button--curve': curve,
          'button--disabled': disabled
        }
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <SpinnerSVG className="spinner" />
      ) : (
        <>
          {!!icon && <span className="button__icon">{icon}</span>}
          <span className="button__content">{children}</span>
        </>
      )}
    </button>
  )
}
