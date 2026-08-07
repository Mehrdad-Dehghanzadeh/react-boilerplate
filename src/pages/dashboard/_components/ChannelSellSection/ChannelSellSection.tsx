import { useDashboardStore } from '@/store'
import { type FC } from 'react'
import clsx from 'clsx'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const ChannelSellSection: FC = () => {
  const { dashboardData, loading } = useDashboardStore()

  const extractData = () => {
    const online = dashboardData?.merchant_store?.branches?.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue?.transaction_online?.sum_amount ?? 0),
      0
    )

    const offline = dashboardData?.merchant_store?.branches?.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue?.transaction_offline?.sum_amount ?? 0),
      0
    )
    return [online ?? 0 / 10, offline ?? 0 / 10]
  }

  const data = {
    labels: ['آنلاین', 'آفلاین'],
    datasets: [
      {
        data: extractData(),
        backgroundColor: ['#00b7ce', '#6366f1'],
        borderWidth: 0
      }
    ]
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }

  return (
    <section
      className={clsx(
        loading ? 'skelton-loading rounded-2xl ' : 'card',
        'w-full h-[380px]'
      )}
    >
      {!loading && (
        <>
          <h2 className="title">فروش آنلاین / آفلاین</h2>
          <strong className="block caption">سهم کانال‌های فروش</strong>

          <div className="w-full h-[280px]">
            <Pie data={data} options={options} />
          </div>
        </>
      )}
    </section>
  )
}
