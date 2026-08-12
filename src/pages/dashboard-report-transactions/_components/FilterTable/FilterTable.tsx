import type { TTicketStatus } from '@ts/Merchant'
import type { TForm, TFiltersProps } from './TFilterTable'
import type { IHomePayload } from '@ts/services/Report'
import { Button, SelectField } from '@/components/UIKit'
import { useTransactionsStore } from '@store'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { removeFalseValue } from '@/utils'
import { TICKET_STATUS_LIST } from '@constants'

export const FilterTable: FC<TFiltersProps> = ({ getData }) => {
  const { branches, loading } = useTransactionsStore()
  const { control, handleSubmit } = useForm<TForm>({
    defaultValues: {
      provider_branch_id: 0,
      duration_create: 0,
      status: ''
    }
  })

  const submit = (data: TForm) => {
    const payload: IHomePayload = removeFalseValue({
      provider_branch_id: Number(data?.provider_branch_id),
      duration_create: Number(data.duration_create),
      status: data.status
    })

    getData(payload)
  }

  return (
    <section className="table-filter">
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
    </section>
  )
}
