import type { TFormData, TStep2Props } from './TStep2'
import type { IAddBranchVerifyPayload } from '@ts/services/Auth'
import type { TRoles } from '@ts/Common'
import type { IAddBranchPayload } from '@ts/services/Auth'
import { useState, type FC } from 'react'
import { useAccessUserStore } from '@store'
import { useForm } from 'react-hook-form'
import { Button, OTPField } from '@UIKit'
import { requiredRule } from '@assets/validationsRules'
import { apis } from '@/services'
import { handleResponseError } from '@/utils'

export const Step2: FC<TStep2Props> = ({ closeUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { handleSubmit, control } = useForm<TFormData>({
    defaultValues: {
      otp: ''
    }
  })

  const { branchResData, formData } = useAccessUserStore()

  const createPayload = (otp: string) => {
    if (formData && branchResData?.session_id) {
      const payload: IAddBranchVerifyPayload = {
        branch_id: Number(formData?.branch_id),
        mobile: formData?.mobile,
        role: formData?.role as TRoles,
        session_id: branchResData?.session_id,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        otp
      }

      return payload
    }
  }

  const handleForm = async (data: TFormData) => {
    try {
      setLoading(true)
      const payload = createPayload(data.otp) as IAddBranchVerifyPayload
      await apis.auth.addBranchVerify(payload)
      closeUpdate()
    } catch (e) {
      handleResponseError(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="add-user-step-2 overflow-hidden">
      <form
        className="flex flex-col items-center justify-between py-7"
        name="addUserStep2"
        onSubmit={handleSubmit(handleForm)}
      >
        <div>
          <h2 className="text-center">تأیید شماره موبایل</h2>

          <p className="text-[#64748B] flex justify-center">
            <span className="text-[#64748B]">{`کد  رقمی ${branchResData?.otp_length || 5} به شماره`}</span>
            <strong className="mx-1">{formData?.mobile}</strong>
            <span className="text-[#64748B]"> ارسال شد.</span>
          </p>

          <OTPField
            className="my-6"
            control={control}
            name="otp"
            length={branchResData?.otp_length || 5}
            rules={{ required: requiredRule() }}
          />
        </div>

        <Button loading={loading} type="submit" className="mt-9">
          تأیید و افزودن کاربر
        </Button>
      </form>
    </section>
  )
}
