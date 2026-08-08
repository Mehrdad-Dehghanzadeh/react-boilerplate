import { type FC } from 'react'
import { useDashboardStore } from '@store'
import clsx from 'clsx'
import { hasItem, getFinancialRangeLabel } from '@utils'

export const TopSections: FC = () => {
  const { loading, dashboardData } = useDashboardStore()

  const setTotalAmount = () => {
    const branches = hasItem(dashboardData?.merchant_store?.branches)
      ? dashboardData?.merchant_store?.branches
      : null

    const val =
      branches?.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.transactions?.sum_amount ?? 0),
        0
      ) ?? 0

    return getFinancialRangeLabel(val)?.replace('.', '/')
  }

  const setRefundedAmount = () => {
    const branches = hasItem(dashboardData?.merchant_store?.branches)
      ? dashboardData?.merchant_store?.branches
      : null

    const val =
      branches?.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.transactions_refunded?.sum_amount ?? 0),
        0
      ) ?? 0

    return getFinancialRangeLabel(val)?.replace('.', '/')
  }

  const items = [
    { title: 'کل تراکنش‌ها', amount: setTotalAmount() },
    { title: 'مبلغ ریفاند شده', amount: setRefundedAmount() }
  ]

  return (
    <div className="flex gap-4 mb-4">
      {items.map((item, index) => (
        <section
          key={index}
          className={clsx(
            loading ? 'skelton-loading rounded-2xl' : 'card flex justify-between',
            'w-full max-w-[400px] h-[108px]'
          )}
        >
          {!loading && (
            <>
              <div>
                <h2 className="font-semi-bold text-t4 text-md mb-2">{item.title}</h2>
                <div className="flex-center">
                  <strong className="text-2xl">{item.amount}</strong>
                  <span className="flex text-t3 text-xs mr-1 font-semibold">تومان</span>
                </div>
              </div>

              <div></div>
            </>
          )}
        </section>
      ))}
    </div>
  )
}
