import type { TAddUserForm } from './TStep1'
import type { TStep1Props } from './TStep1'
import { type TRoles } from '@ts/Common'
import type { ILoginRes } from '@ts/services/Auth'
import { type AxiosResponse } from 'axios'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Group, SelectField, TextField } from '@UIKit'
import { mobileRule, requiredRule } from '@assets/validationsRules'
import { SelectiveCard } from '@shared'
import { useAccessUserStore } from '@store'
import { apis } from '@/services'
import type { IAddBranchPayload } from '@/ts/services/Auth'
import { handleResponseError, showSnackbar } from '@/utils'

export const Step1: FC<TStep1Props> = ({ close }) => {
  const { branches, setBranchResData, setFormData, setStep } = useAccessUserStore()
  const [role, setRole] = useState<TRoles | EmptyString>('')
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, setValue } = useForm<TAddUserForm>({
    defaultValues: {
      mobile: '',
      branch_id: '',
      role: '',
      first_name: '',
      last_name: ''
    }
  })

  const setOptions = () => {
    return branches.map((el) => ({ title: el.store_name, value: el.provider_id }))
  }

  const options = setOptions()

  const handleRes = (resData: ILoginRes, formData: TAddUserForm) => {
    if (resData?.otp_length && resData?.session_id) {
      setBranchResData(resData)
      setFormData(formData)
      setStep(1)
    }
  }

  const handleForm = (formData: TAddUserForm) => {
    if (formData.role) {
      setLoading(true)
      const payload: IAddBranchPayload = {
        branch_id: Number(formData.branch_id),
        mobile: formData.mobile,
        role: formData.role
      }

      apis.auth
        .addBranch(payload)
        .then((res) => {
          handleRes(res?.data?.payload?.data, formData)
        })
        .catch((e) => {
          handleResponseError(e)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      showSnackbar({ type: 'error', message: 'لطفا نقش کاربر را انتخاب کنید' })
    }
  }

  const closeDialog = () => {
    close()
  }

  useEffect(() => {
    setValue('role', role)
  }, [role])

  return (
    <section className="add-user-step-1">
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="flex gap-3 mb-4">
          <TextField
            control={control}
            name="first_name"
            label="نام"
            rules={{ required: requiredRule() }}
          />
          <TextField
            control={control}
            name="last_name"
            label="نام خانوادگی"
            rules={{ required: requiredRule() }}
          />
        </div>
        <TextField
          className="mb-4"
          control={control}
          name="mobile"
          label="شماره موبایل"
          rules={{ required: requiredRule(), validate: mobileRule }}
        />

        <Group className="flex gap-3 mb-4" selected={role} setSelected={setRole}>
          <SelectiveCard
            className="w-full"
            title="مدیر"
            description="دسترسی کامل"
            key={'admin'}
          />
          <SelectiveCard
            className="w-full"
            title="کاربر"
            description="دسترسی محدود"
            key={'viewer'}
          />
        </Group>

        <SelectField
          control={control}
          name="branch_id"
          className="mb-4"
          options={options}
          label="شعبه"
          rules={{ required: requiredRule() }}
        />

        <div className="modal-footer">
          <Button
            type="button"
            variant="outlined"
            disabled={loading}
            onClick={closeDialog}
          >
            انصراف
          </Button>

          <Button type="submit" loading={loading}>
            ارسال کد تأیید
          </Button>
        </div>
      </form>
    </section>
  )
}
