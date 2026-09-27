import { createRoute, redirect } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { DashboardLayout } from '@layouts'
import { isAuthentication } from '@utils'
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
  path: '/settlement-details',
  validateSearch: (search: Record<string, unknown>): SettlementDetailsSearch => {
    return {
      settlement_id: search.settlement_id as string | number | undefined,
      provider_branch_id: search.provider_branch_id as string | number | undefined
    }
  },

  loaderDeps: ({ search: { settlement_id, provider_branch_id } }) => ({
    settlement_id,
    provider_branch_id
  }),

  loader: ({ deps }) => {
    return Boolean(deps?.settlement_id) && Boolean(deps?.provider_branch_id)
      ? apis.report.settlementId({
          provider_branch_id: Number(deps?.provider_branch_id),
          settlement_id: Number(deps?.settlement_id)
        })
      : Promise.reject(new Error('provider_branch_id or settlement_id is not found'))
  }
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
