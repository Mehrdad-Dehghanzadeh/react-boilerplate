import type { IDashboardPayload, IDashboardRes } from '@ts/services/Report'
import { useEffect, type FC } from 'react'
import { clsx } from 'clsx'
import type { TDashboardFiltersProps, TForm } from './TDashboardFilters'
import { Button, SelectField, type TSelectOptions } from '@UIKit'
import { useForm } from 'react-hook-form'
import { useDashboardStore } from '@store'
import { apis } from '@/services'
import { handleResponseError, hasItem, removeFalseValue } from '@utils'
import './DashboardFilters.scss'

export const DashboardFilters: FC<TDashboardFiltersProps> = ({
  className = '',
  ...props
}) => {
  const { setLoading, setDashboardData, loading, branches, setBranches } =
    useDashboardStore()

  const { control, handleSubmit } = useForm<TForm>({
    defaultValues: {
      channel: 'both',
      branchId: 0
    }
  })

  const setBranchOptions = (data: IDashboardRes) => {
    const temp = hasItem(data?.merchant_store?.branches)
      ? data?.merchant_store?.branches?.map((el) => ({
          value: el?.id,
          title: el?.store_name
        }))
      : []

    temp?.unshift({ title: 'همه شعب', value: 0 })

    setBranches(temp)
  }

  const channelOptions: TSelectOptions = [
    { title: 'آنلاین', value: 'online' },
    { title: 'آفلاین', value: 'offline' },
    { title: 'آنلاین و آفلاین', value: 'both' }
  ]

  const createPayload = (formData?: TForm): IDashboardPayload => {
    const payload: IDashboardPayload = {
      duration_create: 30,
      provider_branch_id: Number(formData?.branchId)
    }

    if (formData?.channel === 'online') {
      payload.online = true
      payload.offline = false
    }

    if (formData?.channel === 'offline') {
      payload.online = false
      payload.offline = true
    }

    const obj = removeFalseValue(payload)

    return { duration_create: 30, ...obj }
  }

  const handleRes = (data: IDashboardRes) => {
    if (data) {
      setDashboardData(data)
    }
  }

  const getData = (formData?: TForm) => {
    setLoading(true)
    const payload = createPayload(formData)

    apis.report
      .dashboard(payload)
      .then((res) => {
        handleRes(res?.data?.payload?.data)

        if (!formData) {
          setBranchOptions(res?.data?.payload?.data)
        }
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleForm = (formData: TForm) => {
    getData(formData)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className={clsx('dashboard-filters', className)} {...props}>
      <form className="flex gap-3 items-center " onSubmit={handleSubmit(handleForm)}>
        <SelectField
          className="w-64"
          name="branchId"
          inputLabel="شعبه"
          control={control}
          options={branches}
          disabled={loading}
        />

        <SelectField
          className="w-48"
          name="channel"
          inputLabel="کانال"
          control={control}
          options={channelOptions}
          disabled={loading}
        />
        <Button className="w-16" type="submit" loading={loading}>فیلتر</Button>
      </form>
    </section>
  )
}
