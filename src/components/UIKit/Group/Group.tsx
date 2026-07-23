import type { TGroupProps } from './TGroup'
import { type FC, Children, cloneElement } from 'react'
import clsx from 'clsx'

export const Group: FC<TGroupProps> = ({
  children,
  selected,
  setSelected,
  className = '',
  classNameSelected = 'is-selected',
  ...props
}) => {
  const clicked = (key: any) => {
    setSelected(key)
  }

  return (
    <div className={clsx('group', className)} {...props}>
      {Children.map(children, (Item: any) => {
        return cloneElement(Item, {
          className:
            selected == Item.key
              ? `${Item?.props?.className || ''} ` + classNameSelected
              : `${Item?.props?.className || ''}`,
          onClick: (e) => {
            clicked(Item.key)
            Item?.onClick?.(e)
          }
        })
      })}
    </div>
  )
}
