import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import {  TransactionsTab } from './_components'

const ReportTransactionsPage: FC = () => {
  return (
    <article id="report-transactions-page" className="full-page-relative">
      <TransactionsTab />
    </article>
  )
}

export const Route = createLazyRoute(URLS.reportTransactions.href)({
  component: ReportTransactionsPage
})
