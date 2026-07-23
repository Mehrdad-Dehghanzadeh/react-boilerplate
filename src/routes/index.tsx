import { createRouter, createRoute } from '@tanstack/react-router'
import { Route } from './__root'
import { URLS } from '@constants'

const indexRoute = createRoute({
  getParentRoute: () => Route,
  path: URLS.home.href
}).lazy(() => import('@/pages/home/Home.lazy').then((d) => d.Route))

const transfersRoute = createRoute({
  getParentRoute: () => Route,
  path: URLS.transfers.href
}).lazy(() => import('@/pages/transfers/Transfers.lazy').then((d) => d.Route))

const routeTree = Route.addChildren([indexRoute, transfersRoute])

export const router = createRouter({
  routeTree,
  basepath: import.meta.env.VITE_BASE_PATH_URL
})
