import type { FC } from 'react'
import { Button, TextField } from '@UIKit'
import { useForm } from 'react-hook-form'
import { mobileRule, requiredRule } from '@assets/validationsRules'
import PhoneIcon from '@assets/svg/phone.svg?react'
import ArrowIcon from '@assets/svg/arrow-right.svg?react'
import { useLoginStore } from '@store'

export const Step1: FC = () => {
  const { setStep, setMobileNumber } = useLoginStore()
  const { watch, control, handleSubmit } = useForm({
    defaultValues: { mobile_number: '' }
  })

  const mobile_number = watch('mobile_number')

  const handleStep1 = () => {
    setMobileNumber(mobile_number)
    setStep(1)
  }

  return (
    <div className="login-step" id="login-step-1">
      <h2 className="text-2xl mb-3 font-extrabold">ورود به پنل مرچنت</h2>
      <p className="text-[#64748B] mb-8">
        شماره موبایل خود را وارد کنید تا کد تأیید برایتان ارسال شود.
      </p>

      <form name="loginStep1" id="loginStep1" onSubmit={handleSubmit(handleStep1)}>
        <p className="font-bold mb-2 text-[#0F172A]">شماره موبایل</p>
        <TextField
          name="mobile_number"
          control={control}
          placeholder="0912 345 6789"
          rules={{ required: requiredRule(), validate: mobileRule }}
          type="number"
          inputMode="numeric"
          prefixIcon={<PhoneIcon />}
          ltr
        />
        <Button className="mt-6" type="submit">
          <span className="flex items-center">
            <span className="font-bold ml-2">دریافت کد تایید</span>
            <ArrowIcon />
          </span>
        </Button>
      </form>
    </div>
  )
}
