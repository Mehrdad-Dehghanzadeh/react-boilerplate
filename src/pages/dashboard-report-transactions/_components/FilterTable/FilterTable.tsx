import type { TCsvColumns } from '@ts/Common'
import type { TForm, TFiltersProps } from './TFilterTable'
import type { IHomePayload } from '@ts/services/Report'
import { Button, CalendarField, SelectField, TextField } from '@UIKit'
import { useTransactionsStore } from '@store'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, price, utcToJalaali, jalaliToUnix } from '@utils'
import { TICKET_STATUS_LIST, TICKET_STATUS } from '@constants'
import { useCsvBuilder } from '@hooks'
import ExcelIcon from '@assets/svg/excel.svg?react'
import TrashIcon from '@assets/svg/trash.svg?react'
import { mobileRule } from '@assets/validationsRules'
import { useAppStore } from '@store'

export const FilterTable: FC<TFiltersProps> = ({ getData, data }) => {
  const ExcelColumns: TCsvColumns = [
    {
      title: 'شناسه',
      dataIndex: 'id'
    },
    {
      title: 'شماره تراکنش',
      dataIndex: 'track_number'
    },

    {
      title: 'نوع تراکنش',
      dataIndex: 'merchantable_type'
    },

    {
      title: 'وضعیت تراکنش',
      dataIndex: 'status'
    },

    {
      title: 'تاریخ تراکنش',
      dataIndex: 'created_at'
    },

    {
      title: 'مبلغ',
      dataIndex: 'amount'
    }
  ]

  const { profile } = useAppStore()

  const { branches, loading, setFilters } = useTransactionsStore()

  const INITIAL_FORM_VALUES: TForm = {
    provider_branch_id: profile?.branches?.[0]?.provider_id ?? 0,
    status: '',
    mobile: '',
    track_number: '',
    amount: 0,
    pay_time: '',
    create_time: ''
  }

  const { control, handleSubmit, setValues } = useForm<TForm>({
    defaultValues: { ...INITIAL_FORM_VALUES }
  })

  const { getDataCsv, csvLoading } = useCsvBuilder({ tableColumns: ExcelColumns })

  const clearAll = () => {
    setValues({ ...INITIAL_FORM_VALUES })
  }

  const submit = (data: TForm) => {
    const createTime = data.create_time.split('-')
    const payTime = data.pay_time.split('-')
    
    const payload: IHomePayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      status: data.status,
      mobile: data.mobile,
      track_number: data.track_number,
      amount: data.amount ? Number(data.amount) : 0,
      create_time_start: createTime[1] ? jalaliToUnix(createTime[1]) : 0,
      create_time_end: createTime[0]
        ? jalaliToUnix(createTime[0], { hour: 23, minute: 59, second: 59 })
        : 0,
      pay_time_start: payTime[1] ? jalaliToUnix(payTime[1]) : 0,
      pay_time_end: payTime[0]
        ? jalaliToUnix(payTime[0], { hour: 23, minute: 59, second: 59 })
        : 0
    })

    setFilters(payload)
    getData(payload)
  }

  const createExcel = () => {
    const payload = data?.map((el) => ({
      ...el,
      created_at: el.created_at ? utcToJalaali(el.created_at || '') : '',
      status: TICKET_STATUS[el?.status].title,
      amount: price(el.amount || '', ''),
      merchantable_type: el.merchantable_type === 'merchant_cashier' ? 'آفلاین' : 'آنلاین'
    }))

    getDataCsv(payload, `transactions-${Date.now()}`)
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
            فیلتر
          </Button>

          <span
            className="mr-4 flex items-center mb-2 text-error font-bold pointer-none whitespace-nowrap"
            onClick={clearAll}
          >
            <TrashIcon className="ml-1" />
            <span>حذف همه</span>
          </span>
        </div>
      </form>

      {/* <div>
        <Button
          className="w-36"
          type="button"
          loading={csvLoading}
          onClick={createExcel}
          disabled={loading}
          color="success"
        >
          <span className="flex items-center">
            <ExcelIcon />
            <span className="font-sm font-bold mr-2">خروجی Excel</span>
          </span>
        </Button>
      </div> */}
    </section>
  )
}
