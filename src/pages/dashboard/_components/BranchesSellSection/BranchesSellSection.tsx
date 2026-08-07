import { useDashboardStore } from '@/store'
import { type FC } from 'react'
import clsx from 'clsx'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { hasItem } from '@/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export const BranchesSellSection: FC = () => {
  const { dashboardData, loading } = useDashboardStore()

  const extractLabels = () => {
    return hasItem(dashboardData?.merchant_store?.branches)
      ? dashboardData?.merchant_store?.branches.map((el) => el.store_name)
      : []
  }

  const extractData = () => { 
    return hasItem(dashboardData?.merchant_store?.branches)
      ? dashboardData?.merchant_store?.branches.map(
          (el) => (el.transactions?.sum_amount ?? 0) / 10
        )
      : []
  }

  const data = {
    labels: extractLabels(),
    datasets: [
      {
        data: extractData(),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderRadius: 8
      }
    ]
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  } satisfies ChartOptions<'bar'>

  return (
    <section
      className={clsx(
        loading ? 'skelton-loading rounded-2xl' : 'card',
        'w-full h-[380px]'
      )}
    >
      {!loading && (
        <>
          <h2 className="title">فروش به تفکیک شعب</h2>
          <strong className="block caption">میلیون تومان</strong>
          <div className="w-full h-[280px]">
            <Bar data={data} options={options} />
          </div>
        </>
      )}
    </section>
  )
}
