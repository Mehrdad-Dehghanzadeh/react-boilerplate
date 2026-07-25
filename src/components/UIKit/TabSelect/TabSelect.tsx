import type { TTabSelectProps } from './TTabSelect'
import { useState, useEffect, type FC } from 'react'
import clsx from 'clsx'
import { hasItem } from '@utils'
import './TabSelect.scss'

export const TabSelect: FC<TTabSelectProps> = ({
  items,
  setItem,
  disabled = false,
  defaultActiveIndex = 0,
  className = '',
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex)
  const [titleTranslate, setTitleTranslate] = useState<NumberString>('0')

  const setTitleWidth = (): string => {
    return hasItem(items) ? `${100 / items.length}%` : '0px'
  }

  const titleWidth = setTitleWidth()

  useEffect(() => {
    setTitleTranslate(`${activeIndex * -100}`)
  }, [activeIndex])

  return (
    <div className={clsx('tab-select', className)}>
      <ul className="tab-select__list" {...props}>
        {items.map((item, index) => (
          <li
            className={clsx('tab-select__item', {
              'tab-select--active': activeIndex == index
            })}
            key={item.value}
            onClick={() => {
              if (!disabled) {
                setItem(item.value)
                setActiveIndex(index)
              }
            }}
          >
            {item.title}
          </li>
        ))}

        <li
          className="tab-select__active-background"
          style={{ width: titleWidth, transform: `translateX(${titleTranslate}%)` }}
        ></li>
      </ul>
    </div>
  )
}
