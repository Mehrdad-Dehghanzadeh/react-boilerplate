import { type FC, Suspense } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { SettlementTable } from './_components'
import { URLS } from '@constants'

const DashboardPage: FC = () => {
  return (
    <article id="dashboard-settlement-id">
      <Suspense fallback={<div>در حال دریافت اطلاعات تسویه...</div>}>
        <SettlementTable />
      </Suspense>
    </article>
  )
}

export const Route = createLazyRoute(`${URLS.settlementDetails.href}`)({
  component: DashboardPage
})
