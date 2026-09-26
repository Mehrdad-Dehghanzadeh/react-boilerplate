import { type FC, use } from 'react'
import { createLazyRoute, getRouteApi } from '@tanstack/react-router'
import { URLS } from '@constants'

const RouteApi = getRouteApi(`${URLS.deposit.href}/$id`)

const DashboardPage: FC = () => {
  const t = use(RouteApi.useLoaderData())

  return <article id="dashboard-settlement-id"></article>
}

export const Route = createLazyRoute(`${URLS.deposit.href}/$id`)({
  component: DashboardPage
})
