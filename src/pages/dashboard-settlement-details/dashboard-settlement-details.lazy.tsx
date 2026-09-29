import { type FC, useLayoutEffect, useState } from 'react'
import { createLazyRoute, getRouteApi } from '@tanstack/react-router'
import { PaginationTable, NoDataSection } from './_components'
import { URLS } from '@constants'

const RouteApi = getRouteApi(URLS.settlementDetails.href)

const DashboardPage: FC = () => {
  const [section, setSection] = useState<'nodata' | 'table' | 'none'>('none')

  const queryParams = RouteApi.useSearch()

  useLayoutEffect(() => {
    if (queryParams.settlement_id) {
      setSection('table')
    } else {
      setSection('nodata')
    }
  }, [])

  return (
    <article id="dashboard-settlement-id">
      {section == 'nodata' && <NoDataSection />}
      {section === 'table' && <PaginationTable />}
    </article>
  )
}

export const Route = createLazyRoute(`${URLS.settlementDetails.href}`)({
  component: DashboardPage
})
