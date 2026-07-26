import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'

const publicRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/'
})

export const indexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/'
}).lazy(() => import('@/pages/home/Home.lazy').then((d) => d.Route))


export const publicRouteTree = publicRoute.addChildren([indexRoute])
