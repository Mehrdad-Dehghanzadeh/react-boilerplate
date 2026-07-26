import { createRoute, redirect } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { DashboardLayout } from '@layouts'
import { isAuthentication } from '@utils'

const dashboardRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: 'dashboard',
  component: DashboardLayout,
  beforeLoad() {
    if (!isAuthentication()) {
      throw redirect({
        to: '/',
        replace: true
      })
    }
  }
})

const transfersRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'transfers'
}).lazy(() => import('@/pages/transfers/Transfers.lazy').then((d) => d.Route))

export const dashboardRouteTree = dashboardRoute.addChildren([transfersRoute])
