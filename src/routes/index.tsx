import { createRouter } from '@tanstack/react-router'
import { indexRoute, loginRoute, uikitRoute } from './_public'
import { dashboardRouteTree } from './_dashboard'
import { RootRoute } from './__root'
import { isDev } from '@utils';

const childrenTree = [indexRoute, loginRoute, dashboardRouteTree]

if (isDev()) { 
  //@ts-ignore
  childrenTree.push(uikitRoute)
}

const routeTree = RootRoute.addChildren(childrenTree)

export const router = createRouter({
  routeTree
})
