import { useEffect, type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { TransactionsTab, SettlementItemTab } from './_components'
import { useDeposit } from '@store'
import { Tabs } from '@UIKit'

const DashboardDeposit: FC = () => {
  const { setFilters } = useDeposit()

  useEffect(
    () => () => {
      setFilters(null)
    },
    []
  )
  return (
    <article id="report-transactions-page" className="full-page-relative">
      <Tabs titles={['تسویه سفارش ها', 'واریز ها']} navClassName="w-fit">
        <SettlementItemTab />
        <TransactionsTab />
      </Tabs>
    </article>
  )
}

export const Route = createLazyRoute(URLS.refunded.href)({
  component: DashboardDeposit
})
