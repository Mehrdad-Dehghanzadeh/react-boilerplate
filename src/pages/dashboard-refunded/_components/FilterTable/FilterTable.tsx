import type { TCsvColumns } from '@ts/Common'
import type { TForm, TFiltersProps } from './TFilterTable'
import type {  IRefundPayload } from '@ts/services/Report'
import { Button, SelectField, TextField } from '@UIKit'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue, price, utcToJalaali } from '@utils'
import { REFUND_STATUS_LIST } from '@constants'
import { useCsvBuilder } from '@hooks'
import TrashIcon from '@assets/svg/trash.svg?react'
import { mobileRule } from '@assets/validationsRules'
import { useAppStore, useRefundStore } from '@store'

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
    track_number: ''
  }

  const { control, handleSubmit, setValues } = useForm<TForm>({
    defaultValues: { ...INITIAL_FORM_VALUES }
  })

  const { getDataCsv, csvLoading } = useCsvBuilder({ tableColumns: ExcelColumns })

  const clearAll = () => {
    setValues({ ...INITIAL_FORM_VALUES })
  }

  const submit = (data: TForm) => {
    const payload: IRefundPayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      status: data.status,
      mobile: data.mobile
    })

    setFilters(payload)
    getData(payload)
  }

  const createExcel = () => {
    const payload = data?.map((el) => ({
      ...el,
      created_at: el.created_at ? utcToJalaali(el.created_at || '') : '',
      amount: price(el.amount || '', ''),
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
          options={REFUND_STATUS_LIST}
          disabled={loading}
          clearable
          dense
        />

        <SelectField
          className="w-[196px]"
          name="duration_create"
          label="دوره"
          control={control}
          options={[
            { title: 'روزانه', value: 1 },
            { title: 'هفته', value: 7 },
            { title: 'ماه', value: 30 },
            { title: 'سه ماه', value: 90 }
          ]}
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

        <Button
          className="w-[128px] h-10 mt-4 mr-4"
          loading={loading}
          type="submit"
          curve
        >
          فیلتر
        </Button>

        <span
          className="mr-4 flex items-center mt-5 text-error font-bold pointer-none"
          onClick={clearAll}
        >
          <TrashIcon className="ml-1" />
          <span>حذف همه</span>
        </span>
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
