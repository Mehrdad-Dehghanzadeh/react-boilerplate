import type { TCsvColumns } from '@ts/Common'
import type { TForm, TFiltersProps } from './TFilterTable'
import type { IHomePayload } from '@ts/services/Report'
import { Button, SelectField } from '@UIKit'
import { useTransactionsStore } from '@store'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, hasItem, price, utcToJalaali } from '@utils'
import { TICKET_STATUS_LIST, TICKET_STATUS } from '@constants'
import ExcelIcon from '@assets/svg/excel.svg?react'
import { useCsvBuilder } from '@hooks'

export const FilterTable: FC<TFiltersProps> = ({ getData, data }) => {
  const ExcelColumns: TCsvColumns = [
    {
      title: 'شماره تراکنش',
      dataIndex: 'ticket_number'
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

  const { branches, loading, setFilters } = useTransactionsStore()
  const { control, handleSubmit } = useForm<TForm>({
    defaultValues: {
      provider_branch_id: 0,
      duration_create: 0,
      status: ''
    }
  })

  const { getDataCsv, csvLoading } = useCsvBuilder({ tableColumns: ExcelColumns })

  const submit = (data: TForm) => {
    const payload: IHomePayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      duration_create: Number(data.duration_create),
      status: data.status
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

  return (
    <section className="flex justify-between items-center mb-10" id="table-filter">
      <form className="flex gap-3 items-center" onSubmit={handleSubmit(submit)}>
        <SelectField
          className="w-[196px]"
          name="status"
          control={control}
          options={TICKET_STATUS_LIST}
          disabled={loading}
        />

        <SelectField
          className="w-[196px]"
          name="duration_create"
          control={control}
          options={[
            { title: 'هفته', value: 7 },
            { title: 'ماه', value: 30 },
            { title: 'سه ماه', value: 90 }
          ]}
          disabled={loading}
        />

        <SelectField
          className="w-[196px]"
          name="provider_branch_id"
          control={control}
          options={branches}
          disabled={loading}
        />

        <Button className="w-fit" loading={loading} type="submit">
          فیلتر
        </Button>
      </form>

      <div>
        <Button
          className="w-36"
          type="button"
          loading={csvLoading}
          onClick={createExcel}
          color="success"
        >
          <span className="flex items-center">
            <ExcelIcon />
            <span className="font-sm font-bold mr-2">خروجی Excel</span>
          </span>
        </Button>
      </div>
    </section>
  )
}
