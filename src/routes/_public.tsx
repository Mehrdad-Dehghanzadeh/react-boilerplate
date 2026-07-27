import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'
import { URLS } from '@constants'

const publicRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/'
})

export const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/'
}).lazy(() => import('@/pages/home/Home.lazy').then((d) => d.Route))

export const loginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: URLS.login.href
}).lazy(() => import('@/pages/login/Login.lazy').then((d) => d.Route))

export const publicRouteTree = publicRoute.addChildren([indexRoute, loginRoute])
