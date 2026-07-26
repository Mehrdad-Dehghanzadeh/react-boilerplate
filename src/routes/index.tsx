import { createRouter } from '@tanstack/react-router'
import { indexRoute } from './_public'
import { dashboardRouteTree } from './_dashboard'
import { RootRoute } from './__root'

const routeTree = RootRoute.addChildren([indexRoute, dashboardRouteTree])

export const router = createRouter({
  routeTree,
  basepath: import.meta.env.VITE_BASE_PATH_URL
})
