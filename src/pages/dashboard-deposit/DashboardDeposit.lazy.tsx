import { useEffect, type FC } from 'react'
import { createLazyRoute, getRouteApi } from '@tanstack/react-router'
import { URLS } from '@constants'
import { TransactionsTab, SettlementItemTab } from './_components'
import { useDeposit } from '@store'
import { Tabs } from '@UIKit'

const RouteApi = getRouteApi(URLS.deposit.href)

const DashboardDeposit: FC = () => {
  const { setFilters, setSettlementFilters } = useDeposit()
  const queryParams = RouteApi.useSearch()

  useEffect(
    () => () => {
      setFilters(null)
      setSettlementFilters(null)
    },
    []
  )
  return (
    <article id="report-transactions-page" className="full-page-relative">
      <Tabs
        titles={['تسویه سفارش ها', 'واریز ها']}
        navClassName="w-fit"
        swiperOptions={{
          allowTouchMove: false,
          simulateTouch: false,
          initialSlide: queryParams?.initialSlide ? Number(queryParams?.initialSlide) : 0
        }}
      >
        <SettlementItemTab />
        <TransactionsTab />
      </Tabs>
    </article>
  )
}

export const Route = createLazyRoute(URLS.refunded.href)({
  component: DashboardDeposit
})
