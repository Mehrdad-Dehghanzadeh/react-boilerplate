import { useEffect, type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'


const ReportTransactionsPage: FC = () => {
  return <article id="report-transactions-page" className="full-page-relative"></article>
}

export const Route = createLazyRoute(URLS.reportTransactions.href)({
  component: ReportTransactionsPage
})
