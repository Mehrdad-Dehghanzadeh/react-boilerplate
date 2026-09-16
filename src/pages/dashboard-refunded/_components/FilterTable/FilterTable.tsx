import type { TCsvColumns } from '@ts/Common'
import type { TForm, TFiltersProps } from './TFilterTable'
import type { IRefundPayload } from '@ts/services/Report'
import { Button, CalendarField, SelectField, TextField } from '@UIKit'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, price, utcToJalaali, jalaliToUnix } from '@utils'
import { REFUND_STATUS_LIST } from '@constants'
import { useCsvBuilder } from '@hooks'
import TrashIcon from '@assets/svg/trash.svg?react'
import { mobileRule } from '@assets/validationsRules'
import { useAppStore, useRefundStore } from '@store'
import { CalendarDay } from '@daypicker/react'

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

  const { branches, loading, setFilters } = useRefundStore()

  const INITIAL_FORM_VALUES: TForm = {
    provider_branch_id: profile?.branches?.[0]?.provider_id ?? 0,
    duration_create: 0,
    status: '',
    mobile: '',
    amount: '',
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

    const payload: IRefundPayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      status: data.status,
      mobile: data.mobile,
      amount: Number(data.amount),
      create_time_start: createTime[0] ? jalaliToUnix(createTime[0]) : 0,
      create_time_end: createTime[1]
        ? jalaliToUnix(createTime[1], { hour: 23, minute: 59, second: 59 })
        : 0
    })

    setFilters(payload)
    getData(payload)
  }

  const createExcel = () => {
    const payload = data?.map((el) => ({
      ...el,
      created_at: el.created_at ? utcToJalaali(el.created_at || '') : '',
      amount: price(el.amount || '', '')
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

          <TextField
            className="w-[196px]"
            name="amount"
            label="مبلغ"
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
            options={REFUND_STATUS_LIST}
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
        </div>

        <div className="flex items-end mr-4">
          <Button
            className="w-[128px] h-10 rounded-2xl"
            loading={loading}
            type="submit"
          >
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
