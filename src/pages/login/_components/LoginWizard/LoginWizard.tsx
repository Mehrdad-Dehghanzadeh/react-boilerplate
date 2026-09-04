import { type FC } from 'react'
import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { useLoginStore } from '@store'
import { Step1, Step2, Step3 } from '../'
import Logo1 from '@assets/svg/logo-1.svg?react'

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
    <div className="max-w-[400px] mx-auto">
      <Logo1 className="mb-6 h-10" />
      <Swiper
        className="login-wizard"
        effect={'fade'}
        allowTouchMove={false}
        simulateTouch={false}
        ref={swiperRef}
      >
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
    </div>
  )
}
