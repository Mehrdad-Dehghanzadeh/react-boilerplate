import { createRoute, redirect } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { DashboardLayout } from '@layouts'
import { isAuthentication } from '@utils'
import { URLS } from '@constants'

const dashboardRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: 'dashboard',
  component: DashboardLayout,

  beforeLoad() {
    if (!isAuthentication()) {
      throw redirect({
        to: URLS.login.href,
        replace: true
      })
    }
  }
})

const homeDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/'
}).lazy(() => import('@pages/dashboard/Dashboard.lazy').then((d) => d.Route))

const reportTransactionsDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/report-transactions'
}).lazy(() =>
  import('@pages/dashboard-report-transactions/ReportTransactions.lazy').then(
    (d) => d.Route
  )
)

const accessUsersDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/access-users'
}).lazy(() =>
  import('@pages/dashboard-access-users/AccessUsers.lazy').then(
    (d) => d.Route
  )
)


export const dashboardRouteTree = dashboardRoute.addChildren([
  homeDashboard,
  reportTransactionsDashboard,
  accessUsersDashboard
])
