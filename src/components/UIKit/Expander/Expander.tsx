import type { TExpanderProps } from './TExpander'
import { type FC } from 'react'
import { clsx } from 'clsx'
import './Expander.scss'

export const Expander: FC<TExpanderProps> = ({
  expand,
  setExpand,
  innerContent,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx('expander', { 'expander--open': expand }, className)}
      aria-expanded={`${expand}`}
      {...props}
    >
      <div className="expander__presentation" role="presentation">
        {children}
      </div>

      <div className="expander__content" role="region">
        {innerContent}
      </div>
    </div>
  )
}
