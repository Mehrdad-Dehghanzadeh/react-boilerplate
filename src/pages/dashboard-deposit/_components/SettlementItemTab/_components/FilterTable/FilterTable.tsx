import type { TForm, TFiltersProps } from './TFilterTable'
import type { ISettlementItemPayload } from '@ts/services/Report'
import { Button, CalendarField, SelectField, TextField } from '@UIKit'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, jalaliToUnix } from '@utils'
import { REFUND_STATUS_LIST, SETTLEMENT_STATUS_LIST } from '@constants'
import TrashIcon from '@assets/svg/trash.svg?react'
import { mobileRule } from '@assets/validationsRules'
import { useAppStore, useDeposit } from '@store'

export const FilterTable: FC<TFiltersProps> = ({ getData, data }) => {
  const { profile } = useAppStore()

  const { branches, loading, setSettlementFilters } = useDeposit()

  const INITIAL_FORM_VALUES: TForm = {
    provider_branch_id: profile?.branches?.[0]?.provider_id ?? 0,
    status: '',
    mobile: '',
    create_time: '',
    gross_amount: '',
    net_amount: '',
    track_number: ''
  }

  const { control, handleSubmit, setValues } = useForm<TForm>({
    defaultValues: { ...INITIAL_FORM_VALUES }
  })

  const clearAll = () => {
    setValues({ ...INITIAL_FORM_VALUES })
  }

  const submit = (data: TForm) => {
    const createTime = data.create_time.split('-')

    const payload: ISettlementItemPayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      status: data.status,
      mobile: data.mobile,
      create_time_start: createTime[1] ? jalaliToUnix(createTime[1]) : 0,
      create_time_end: createTime[0]
        ? jalaliToUnix(createTime[0], { hour: 23, minute: 59, second: 59 })
        : 0,
      gross_amount: data?.gross_amount ? Number(data?.gross_amount) : undefined,
      net_amount: data?.net_amount ? Number(data?.net_amount) : undefined,
      track_number: data?.track_number
    })

    setSettlementFilters(payload)
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
      <form className="flex gap-3" onSubmit={handleSubmit(submit)}>
        <div className="flex gap-3 flex-wrap">
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

          <CalendarField
            control={control}
            name="create_time"
            label="تاریخ ثبت تراکنش"
            disabled={loading}
            dense
          />

          <SelectField
            className="w-[196px]"
            name="status"
            label="وضعیت"
            control={control}
            options={SETTLEMENT_STATUS_LIST}
            disabled={loading}
            clearable
            dense
          />

          <TextField
            className="w-[196px]"
            name="net_amount"
            label="مبلغ خالص"
            control={control}
            disabled={loading}
            dense
            clearable
          />

          <TextField
            className="w-[196px]"
            name="gross_amount"
            label="مبلغ ناخالص"
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
            name="provider_branch_id"
            label="فروشگاه"
            control={control}
            options={getBranchesOptions()}
            disabled={loading}
            dense
          />
        </div>

        <div className="flex items-end mr-4">
          <Button className="w-[128px] h-10 rounded-2xl" loading={loading} type="submit">
            مشاهده
          </Button>

          <span
            className="mr-4 flex items-center mb-2 text-error font-bold pointer-none whitespace-nowrap"
            onClick={clearAll}
          >
            <TrashIcon className="ml-1 text-[16px]" />
            <span>حذف همه</span>
          </span>
        </div>
      </form>
    </section>
  )
}
