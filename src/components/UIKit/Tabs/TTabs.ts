import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import type { SwiperClass } from 'swiper/react'
import type { SwiperOptions } from 'swiper/types'

export type TTabsProps = ComponentProps<'div'> &
  PropsWithChildren<{
    titles: string[] | ReactNode[]
    wrapperClassName?: string
    containerClassName?: string
    swiperOptions?: SwiperOptions
    onSlideChange?: (swiper: SwiperClass) => void
    navDisabled?: boolean
    lazySlide?: boolean
    navClassName?: string
  }>
