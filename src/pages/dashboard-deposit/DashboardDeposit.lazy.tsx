import { useEffect, type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { TransactionsTab } from './_components'
import { useDeposit } from '@store'

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
      <TransactionsTab />
    </article>
  )
}

export const Route = createLazyRoute(URLS.refunded.href)({
  component: DashboardDeposit
})
