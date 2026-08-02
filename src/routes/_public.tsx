import { createRoute, redirect } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { URLS } from '@constants'
import { isAuthentication } from '@utils'

const publicRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/'
})

export const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',

  beforeLoad() {
    throw redirect({
      to: isAuthentication() ? URLS.dashboard.href : URLS.login.href,
      replace: true
    })
  }
}).lazy(() => import('@/pages/home/Home.lazy').then((d) => d.Route))

export const loginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: URLS.login.href,

  beforeLoad() {
    if (isAuthentication()) {
      throw redirect({
        to: URLS.dashboard.href,
        replace: true
      })
    }
  }
}).lazy(() => import('@/pages/login/Login.lazy').then((d) => d.Route))

export const publicRouteTree = publicRoute.addChildren([indexRoute, loginRoute])
