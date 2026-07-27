import type { FC } from 'react'
import { useLoginStore } from '@store'
import { useForm } from 'react-hook-form'
import ChevronLeftIcon from '@assets/svg/chevron-left.svg?react'
import { requiredRule } from '@/assets/validationsRules'
import { Button, OTPField } from '@UIKit'

export const Step2: FC = () => {
  const { control, handleSubmit } = useForm({ defaultValues: { otp: '' } })
  const { setStep, mobile_number } = useLoginStore()

  const goBack = () => {
    setStep(0)
  }

  const handleStep2 = () => {
    setStep(2)
  }

  return (
    <div id="login-step-2">
      <span role="button" className="flex items-center text-t3 mb-6" onClick={goBack}>
        <ChevronLeftIcon />
        <span className="mr-2">تغییر شماره موبایل</span>
      </span>

      <h2 className="text-2xl mb-3 font-extrabold">کد تأیید را وارد کنید</h2>
      <div className="flex items-center text-t3 mb-8">
        <span>کد 5 رقمی به شماره </span>
        <span className="font-bold mx-1">{mobile_number}</span>
        <span> پیامک شد.</span>
      </div>

      <form
        className="flex flex-col items-center"
        name="loginStep2"
        id="loginStep2"
        onSubmit={handleSubmit(handleStep2)}
      >
        <OTPField
          length={5}
          control={control}
          name="otp"
          rules={{ required: requiredRule() }}
        />

        <Button className="my-6" type="submit" color="primary">
          <span>تأیید و ورود</span>
        </Button>
      </form>
    </div>
  )
}
