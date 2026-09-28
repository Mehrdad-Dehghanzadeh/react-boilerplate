import { type FC, use } from 'react'
import { createLazyRoute, getRouteApi } from '@tanstack/react-router'
import { URLS } from '@constants'

const RouteApi = getRouteApi(URLS.settlementDetails.href)

const DashboardPage: FC = () => {
  const data = RouteApi.useLoaderData()
  console.log(data)
  return <article id="dashboard-settlement-id"></article>
}

export const Route = createLazyRoute(`${URLS.settlementDetails.href}`)({
  component: DashboardPage
})
