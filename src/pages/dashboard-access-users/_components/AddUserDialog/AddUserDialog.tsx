import type { TAddUserDialogProps } from './TAddUserDialog'
import { useImperativeHandle, type FC, useState, useEffect, useRef } from 'react'
import { Modal } from '@UIKit'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { Step1, Step2 } from '@pages/dashboard-access-users/_components'
import { useAccessUserStore } from '@store'

export const AddUserDialog: FC<TAddUserDialogProps> = ({ ref }) => {
  const { step } = useAccessUserStore()
  const [open, setOpen] = useState<boolean>(false)
  const swiperRef = useRef<SwiperRef>(null)

  const handleStep = () => {
    swiperRef.current?.swiper.slideTo(step)
  }

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    handleStep()
  }, [step])

  const openDialog = () => {
    setOpen(true)
  }

  useImperativeHandle(
    ref,
    () => ({
      openDialog
    }),
    []
  )

  useEffect(() => {}, [open])

  return (
    <Modal size="sm" open={open} setOpen={setOpen} title="افزودن کاربر جدید">
      <Swiper
        effect={'fade'}
        allowTouchMove={false}
        simulateTouch={false}
        ref={swiperRef}
      >
        <SwiperSlide>
          <Step1 close={close} />
        </SwiperSlide>

        <SwiperSlide>
          <Step2 />
        </SwiperSlide>
      </Swiper>
    </Modal>
  )
}
