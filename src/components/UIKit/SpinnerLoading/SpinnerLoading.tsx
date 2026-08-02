import type { TSpinnerLoadingProps } from './TSpinnerLoading'
import { type FC } from 'react'
import clsx from 'clsx'
import './SpinnerLoading.scss'

export const SpinnerLoading: FC<TSpinnerLoadingProps> = ({
  loading,
  children,
  className = ''
}) => {
  return loading ? (
    <svg
      className={clsx('spinner-loading', className)}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="spinner-loading__group">
        <circle
          className="spinner-loading__circle"
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth="3"
        ></circle>
      </g>
    </svg>
  ) : (
    <> {children}</>
  )
}
