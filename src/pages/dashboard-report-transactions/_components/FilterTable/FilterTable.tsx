import type { TForm, TFiltersProps } from './TFilterTable'
import type { IHomePayload } from '@ts/services/Report'
import { Button, CalendarField, SelectField, TextField } from '@UIKit'
import { useTransactionsStore } from '@store'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, jalaliToUnix } from '@utils'
import { TICKET_STATUS_LIST } from '@constants'
import TrashIcon from '@assets/svg/trash.svg?react'
import { mobileRule } from '@assets/validationsRules'
import { useAppStore } from '@store'

const channelOptions: TSelectOptions = [
  { title: 'آنلاین', value: 'online' },
  { title: 'حضوری', value: 'offline' },
  { title: 'آنلاین و حضوری', value: 'both' }
]

export const FilterTable: FC<TFiltersProps> = ({ getData }) => {
  const { profile } = useAppStore()

  const { branches, loading, setFilters } = useTransactionsStore()

  const INITIAL_FORM_VALUES: TForm = {
    provider_branch_id: profile?.branches?.[0]?.provider_id ?? 0,
    status: '',
    mobile: '',
    track_number: '',
    amount: 0,
    pay_time: '',
    create_time: '',
    channel: 'both'
  }

  const { control, handleSubmit, setValues } = useForm<TForm>({
    defaultValues: { ...INITIAL_FORM_VALUES }
  })

  const clearAll = () => {
    setValues({ ...INITIAL_FORM_VALUES })
  }

  const createPayload = (formData: TForm) => {
    const createTime = formData.create_time.split('-')
    const payTime = formData.pay_time.split('-')

    const payload: IHomePayload = removeFalseValue({
      provider_branch_id: Number(formData?.provider_branch_id),
      status: formData.status,
      mobile: formData.mobile,
      track_number: formData.track_number,
      amount: formData.amount ? Number(formData.amount) : 0,
      create_time_start: createTime[1] ? jalaliToUnix(createTime[1]) : 0,
      create_time_end: createTime[0]
        ? jalaliToUnix(createTime[0], { hour: 23, minute: 59, second: 59 })
        : 0,
      pay_time_start: payTime[1] ? jalaliToUnix(payTime[1]) : 0,
      pay_time_end: payTime[0]
        ? jalaliToUnix(payTime[0], { hour: 23, minute: 59, second: 59 })
        : 0
    })
    
    if (formData?.channel === 'online') {
      payload.online = true
      payload.offline = false
    }

    if (formData?.channel === 'offline') {
      payload.online = false
      payload.offline = true
    }

    return payload
  }

  const submit = (data: TForm) => {
    const payload = createPayload(data)

    setFilters(payload)
    getData(payload)
  }

  const getBranchesOptions = () =>
    Boolean(profile?.account?.merchant_id)
      ? branches
      : profile?.branches?.map((el) => ({
          title: el?.name,
          value: Number(el?.provider_id)
        })) || []

  return (
    <section className="flex justify-between items-center mb-10" id="table-filter">
      <form className="flex gap-2" onSubmit={handleSubmit(submit)}>
        <div className="flex flex-wrap gap-3">
          <TextField
            className="w-[196px]"
            name="mobile"
            label="تلفن همراه کاربر"
            rules={{ validate: mobileRule }}
            control={control}
            disabled={loading}
            dense
            clearable
          />

          <TextField
            className="w-[196px]"
            name="amount"
            label="مبلغ"
            control={control}
            disabled={loading}
            dense
            clearable
          />

          <TextField
            className="w-[196px]"
            name="track_number"
            label="کد پیگیری تراکنش"
            control={control}
            disabled={loading}
            dense
            clearable
          />

          <SelectField
            className="w-[196px]"
            name="status"
            label="وضعیت"
            control={control}
            options={TICKET_STATUS_LIST}
            disabled={loading}
            clearable
            dense
          />

          <SelectField
            className="w-[196px]"
            name="provider_branch_id"
            label="شعبه"
            control={control}
            options={getBranchesOptions()}
            disabled={loading}
            dense
          />

          <SelectField
            className="w-48"
            name="channel"
            inputLabel="کانال"
            control={control}
            options={channelOptions}
            disabled={loading}
            dense
          />

          <CalendarField
            control={control}
            name="create_time"
            label="تاریخ ثبت تراکنش"
            disabled={loading}
            dense
          />

          <CalendarField
            control={control}
            name="pay_time"
            label="تاریخ انجام تراکنش"
            disabled={loading}
            dense
          />
        </div>

        <div className="flex w-fit items-end pl-5">
          <Button className="w-[128px] h-10 rounded-2xl" loading={loading} type="submit">
            مشاهده
          </Button>

          <span
            className="mr-4 flex items-center mb-2 text-error font-bold pointer-none whitespace-nowrap"
            onClick={clearAll}
          >
            <TrashIcon className="ml-1  text-[16px]" />
            <span>حذف همه</span>
          </span>
        </div>
      </form>
    </section>
  )
}
