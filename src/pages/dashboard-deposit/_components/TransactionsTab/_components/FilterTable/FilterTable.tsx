import type { TForm, TFiltersProps } from './TFilterTable'
import type { ISettlementPayload } from '@ts/services/Report'
import { Button, CalendarField, SelectField, TextField } from '@UIKit'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, jalaliToUnix } from '@utils'
import { REFUND_STATUS_LIST } from '@constants'
import TrashIcon from '@assets/svg/trash.svg?react'
import { mobileRule } from '@assets/validationsRules'
import { useAppStore, useDeposit } from '@store'

export const FilterTable: FC<TFiltersProps> = ({ getData, data }) => {
  const { profile } = useAppStore()

  const { branches, loading, setFilters } = useDeposit()

  const INITIAL_FORM_VALUES: TForm = {
    provider_branch_id: profile?.branches?.[0]?.provider_id ?? 0,
    duration_create: 0,
    pay_time: '',
    bank_reference: '',
    count: '',
    gross_amount: '',
    net_amount: '',
    iban: ''
  }

  const { control, handleSubmit, setValues } = useForm<TForm>({
    defaultValues: { ...INITIAL_FORM_VALUES }
  })

  const clearAll = () => {
    setValues({ ...INITIAL_FORM_VALUES })
  }

  const submit = (data: TForm) => {
    const payTime = data.pay_time.split('-')

    const payload: ISettlementPayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      pay_time_start: payTime[1] ? jalaliToUnix(payTime[1]) : 0,
      pay_time_end: payTime[0]
        ? jalaliToUnix(payTime[0], { hour: 23, minute: 59, second: 59 })
        : 0,
      bank_reference: data?.bank_reference,
      count: data?.count ? Number(data?.count) : undefined,
      gross_amount: data?.gross_amount ? Number(data?.gross_amount) : undefined,
      net_amount: data?.net_amount ? Number(data?.net_amount) : undefined,
      iban: data?.iban
    })

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
      <form className="flex gap-3" onSubmit={handleSubmit(submit)}>
        <div className="flex gap-3 flex-wrap">
          <SelectField
            className="w-[196px]"
            name="provider_branch_id"
            label="فروشگاه"
            control={control}
            options={getBranchesOptions()}
            disabled={loading}
            dense
          />

          <TextField
            className="w-[196px]"
            name="bank_reference"
            label="شماره تراکنش بانکی"
            control={control}
            disabled={loading}
            dense
            clearable
          />

          <TextField
            className="w-[280px]"
            name="iban"
            label="شماره حساب واریزی"
            control={control}
            disabled={loading}
            dense
            clearable
          />

          <CalendarField
            control={control}
            name="pay_time"
            label="تاریخ تسویه"
            disabled={loading}
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
            name="count"
            label="تعداد سفارشات"
            control={control}
            disabled={loading}
            dense
            clearable
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
