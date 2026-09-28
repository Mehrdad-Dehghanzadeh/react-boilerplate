import { type FC, use } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { URLS } from '@constants'

const RouteApi = getRouteApi(URLS.settlementDetails.href)

export const SettlementTable: FC = () => {
  const data = RouteApi.useLoaderData()

  console.log(data)
  return <div></div>
}
