import type { TAddUserForm } from './TStep1'
import type { TStep1Props } from './TStep1'
import { type TRoles } from '@ts/Common'
import type { ILoginRes, IUpdateUserPayload } from '@ts/services/Auth'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Group, SelectField, TextField, SelectMultiField } from '@UIKit'
import { mobileRule, requiredRule } from '@assets/validationsRules'
import { useAccessUserStore } from '@store'
import { apis } from '@services'
import type { IAddBranchPayload } from '@ts/services/Auth'
import { handleResponseError, showSnackbar, hasItem } from '@utils'

const formDefaultValues: TAddUserForm = {
  mobile: '',
  branch_ids: [],
  role: '',
  first_name: '',
  last_name: '',
  active: null
}

export const Step1: FC<TStep1Props> = ({ close }) => {
  const { branches, setBranchResData, setFormData, setStep, editRecord } =
    useAccessUserStore()

  const isEdit = (): boolean => Boolean(editRecord)

  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit, setValue } = useForm<TAddUserForm>({
    defaultValues: {
      ...formDefaultValues
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

  const createUser = (formData: TAddUserForm) => {
    if (formData.role) {
      setLoading(true)
      const payload: IAddBranchPayload = {
        branch_ids: formData.branch_ids?.map((el) => Number(el)),
        mobile: formData.mobile,
        role: formData.role,
        active: Boolean(formData.active)
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

  const editUser = (formData: TAddUserForm) => {
    if (formData.role && editRecord?.id) {
      setLoading(true)

      const payload: IUpdateUserPayload = {
        branch_ids: formData.branch_ids?.map((el) => Number(el)),
        mobile: formData.mobile,
        role: formData.role,
        active: Boolean(formData.active),
        first_name: formData.first_name?.trim(),
        last_name: formData.last_name?.trim(),
        user_account_id: editRecord?.id
      }

      apis.auth
        .updateUser(payload)
        .then(() => {
          showSnackbar({ type: 'success', message: 'اطلاعات کاربر ویرایش شد' })
        })
        .catch((e) => {
          handleResponseError(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleForm = (formData: TAddUserForm) => {
    if (isEdit()) {
      editUser(formData)
    } else {
      createUser(formData)
    }
  }

  const closeDialog = () => {
    close()
  }

  useEffect(() => {
    if (isEdit()) {
      setValue('mobile', editRecord?.mobile || '')
      setValue('first_name', editRecord?.first_name || '')
      setValue('last_name', editRecord?.last_name || '')
      setValue('role', editRecord?.role || '')
      if (editRecord?.branch_ids && hasItem(editRecord?.branch_ids)) {
        setValue('branch_ids', [...editRecord?.branch_ids])
      }
    }
  }, [editRecord])

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

        <SelectField
          className="mb-4"
          name="active"
          label="وضعیت کاربر"
          control={control}
          options={[
            { title: 'فعال', value: 1 },
            { title: 'غیر فعال', value: 0 }
          ]}
          rules={{ required: requiredRule() }}
        />

        <SelectField
          className="mb-4"
          name="role"
          label="نقش"
          control={control}
          options={[
            { title: 'مدیر (دسترسی کامل)', value: 'admin' },
            { title: 'کاربر (دسترسی محدود)', value: 'viewer' }
          ]}
        />

        <SelectMultiField
          control={control}
          name="branch_ids"
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
            {isEdit() ? 'ویرایش' : 'ارسال کد تأیید'}
          </Button>
        </div>
      </form>
    </section>
  )
}
