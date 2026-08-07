import type { IDashboardPayload, IDashboardRes } from '@ts/services/Report'
import { useEffect, type FC } from 'react'
import { clsx } from 'clsx'
import type { TDashboardFiltersProps } from './TDashboardFilters'
import { SelectField, type TSelectOptions } from '@UIKit'
import { useForm } from 'react-hook-form'
import { useDashboardStore } from '@store'
import { apis } from '@/services'
import { handleResponseError } from '@/utils'
import './DashboardFilters.scss'

export const DashboardFilters: FC<TDashboardFiltersProps> = ({
  className = '',
  ...props
}) => {
  const { setLoading, setDashboardData } = useDashboardStore()

  const { control } = useForm({
    defaultValues: {
      channel: null
    }
  })

  const channelOptions: TSelectOptions = [
    { title: 'آنلاین', value: 'online' },
    { title: 'آفلاین', value: 'offline' },
    { title: 'آنلاین و آفلاین', value: 'both' }
  ]

  const createPayload = (): IDashboardPayload => {
    return {
      duration_create: 30
    }
  }

  const handleRes = (data: IDashboardRes) => {
    if (data) {
      setDashboardData(data)
    }
  }

  const getData = () => {
    setLoading(true)
    const payload = createPayload()
    apis.report
      .dashboard(payload)
      .then((res) => {
        handleRes(res?.data?.payload?.data)
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className={clsx('dashboard-filters', className)} {...props}>
      <form className="flex gap-3 items-center ">
        <SelectField
          className="w-48"
          name="channel"
          label="کانال"
          control={control}
          options={channelOptions}
        />
      </form>
    </section>
  )
}
