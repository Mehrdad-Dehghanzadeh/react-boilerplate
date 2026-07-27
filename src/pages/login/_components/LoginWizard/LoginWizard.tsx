import { type FC } from 'react'
import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { useLoginStore } from '@store'
import { Step1, Step2, Step3 } from '../'

export const LoginWizard: FC = () => {
  const swiperRef = useRef<SwiperRef>(null)
  const { clear, step } = useLoginStore()

  const handleStep = () => {
    swiperRef.current?.swiper.slideTo(step)
  }

  useEffect(() => {
    handleStep()
  }, [step])

  useEffect(
    () => () => {
      clear()
    },
    []
  )

  return (
    <Swiper effect={'fade'} allowTouchMove={false} simulateTouch={false} ref={swiperRef}>
      <SwiperSlide>
        <Step1 />
      </SwiperSlide>

      <SwiperSlide>
        <Step2 />
      </SwiperSlide>

      <SwiperSlide>
        <Step3 />
      </SwiperSlide>
    </Swiper>
  )
}
