import { useEffect, type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { TransactionsTab } from './_components'
import { useTransactionsStore } from '@store'

const ReportTransactionsPage: FC = () => {
  const { setFilters } = useTransactionsStore()

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

export const Route = createLazyRoute(URLS.dashboard.href)({
  component: ReportTransactionsPage
})
