import type { IVerifyPayload } from '@ts/services/Auth'
import { useState, type FC } from 'react'
import { useLoginStore } from '@store'
import { useForm } from 'react-hook-form'
import ChevronLeftIcon from '@assets/svg/chevron-left.svg?react'
import { requiredRule } from '@assets/validationsRules'
import { Button, OTPField } from '@UIKit'
import { apis } from '@services'

export const Step2: FC = () => {
  const { control, handleSubmit, getValues } = useForm({ defaultValues: { otp: '' } })
  const { setStep, mobile, loginResData } = useLoginStore()
  const [loading, setLoading] = useState<boolean>(false)

  const goBack = () => {
    setStep(0)
  }

  const createPayload = (): IVerifyPayload => {
    const session_id = loginResData?.session_id as string
    const otp = getValues('otp')

    return {
      session_id,
      otp
    }
  }

  const handleVerify = () => {
    setStep(2)
  }

  const handleStep2 = () => {
    setLoading(true)
    const payload = createPayload()

    apis.auth
      .verify(payload)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
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
        <span className="font-bold mx-1">{mobile}</span>
        <span> پیامک شد.</span>
      </div>

      <form
        className="flex flex-col items-center"
        name="loginStep2"
        id="loginStep2"
        onSubmit={handleSubmit(handleStep2)}
      >
        <OTPField
          length={loginResData?.otp_length || 4}
          control={control}
          name="otp"
          rules={{ required: requiredRule() }}
        />

        <Button className="my-6" type="submit" color="primary" loading={loading}>
          <span>تأیید و ورود</span>
        </Button>
      </form>
    </div>
  )
}
