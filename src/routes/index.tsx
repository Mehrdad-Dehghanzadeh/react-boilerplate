import { createRouter } from '@tanstack/react-router'
import { indexRoute, loginRoute } from './_public'
import { dashboardRouteTree } from './_dashboard'
import { RootRoute } from './__root'

const routeTree = RootRoute.addChildren([indexRoute, loginRoute, dashboardRouteTree])

export const router = createRouter({
  routeTree
})
