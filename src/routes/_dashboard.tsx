import { createRoute, redirect } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { DashboardLayout } from '@layouts'
import { isAuthentication } from '@utils'
import { URLS } from '@constants';

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

const accessUserDashboard = createRoute({
  getParentRoute: () => dashboardRoute,
  path: 'transfers'
}).lazy(() => import('@/pages/dashboard/Dashboard.lazy').then((d) => d.Route))

export const dashboardRouteTree = dashboardRoute.addChildren([accessUserDashboard])
