import { type FC, Children, useRef, useState, useEffect } from 'react'
import clsx from 'clsx'
import type { TTabsProps } from './TTabs'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { hasItem } from '@utils'
import './Tabs.scss'

export const Tabs: FC<TTabsProps> = ({
  children,
  titles,
  className = '',
  wrapperClassName = '',
  containerClassName = '',
  navClassName = '',
  lazySlide = false,
  navDisabled = false,
  swiperOptions,
  onSlideChange,
  ...props
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(
    swiperOptions?.initialSlide ?? 0
  )
  const [titleTranslate, setTitleTranslate] = useState<NumberString>('0')

  const swiperRef = useRef<SwiperRef>(null)

  const setTitleWidth = (): string => {
    return hasItem(titles) ? `${100 / titles.length}%` : '0px'
  }

  const titleWidth = setTitleWidth()

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(activeSlideIndex)
    setTitleTranslate(`${activeSlideIndex * -100}`)
  }, [activeSlideIndex])

  return (
    <div className={clsx('tabs', className)} {...props}>
      <div
        className={clsx('tabs-nav', navClassName, {
          'tabs-nav--disabled': navDisabled
        })}
      >
        <ul className="tabs-nav__list" role="tab">
          {titles.map((item, index) => (
            <li
              className={clsx('tabs-nav__item', {
                'tabs-nav__item--active': activeSlideIndex == index
              })}
              key={index}
              onClick={() => {
                if (!navDisabled) {
                  setActiveSlideIndex(index)
                }
              }}
            >
              {item}
            </li>
          ))}
          <li
            className="tabs-nav__active-background"
            style={{ width: titleWidth, transform: `translateX(${titleTranslate}%)` }}
          ></li>
        </ul>
      </div>

      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => {
          setActiveSlideIndex(swiper.activeIndex)
          onSlideChange?.(swiper)
        }}
        {...swiperOptions}
      >
        <div className={clsx('tabs__container', containerClassName)}>
          {Children.map(children, (child, index) => (
            <SwiperSlide key={index}>
              <div
                className={clsx(
                  'tabs__content',
                  {
                    'tabs__content--active': activeSlideIndex == index,
                    'tabs__content--lazy': lazySlide
                  },
                  wrapperClassName
                )}
              >
                {child}
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  )
}
