import { createRoute, redirect, defer } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { DashboardLayout } from '@layouts'
import { isAuthentication, removeFalseValue } from '@utils'
import { URLS } from '@constants'
import { apis } from '@services'

type SettlementDetailsSearch = {
  settlement_id?: number | string
  provider_branch_id?: number | string
}
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

// const homeDashboard = createRoute({
//   getParentRoute: () => dashboardRoute,
//   path: '/'
// }).lazy(() => import('@pages/dashboard/Dashboard.lazy').then((d) => d.Route))

const reportTransactionsDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/'
}).lazy(() =>
  import('@pages/dashboard-report-transactions/ReportTransactions.lazy').then(
    (d) => d.Route
  )
)

const accessUsersDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/access-users'
}).lazy(() =>
  import('@pages/dashboard-access-users/AccessUsers.lazy').then((d) => d.Route)
)

const profileDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile'
}).lazy(() => import('@pages/dashboard-profile/Profile.lazy').then((d) => d.Route))

const refundedDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/refunded'
}).lazy(() =>
  import('@pages/dashboard-refunded/DashboardRefunded.lazy').then((d) => d.Route)
)

const depositDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/settlement'
}).lazy(() =>
  import('@pages/dashboard-deposit/DashboardDeposit.lazy').then((d) => d.Route)
)

const settlementIdDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/settlement-details'
}).lazy(() =>
  import('@pages/dashboard-settlement-details/dashboard-settlement-details.lazy').then(
    (d) => d.Route
  )
)

export const dashboardRouteTree = dashboardRoute.addChildren([
  reportTransactionsDashboard,
  accessUsersDashboard,
  profileDashboard,
  refundedDashboard,
  depositDashboard,
  settlementIdDashboard
])
