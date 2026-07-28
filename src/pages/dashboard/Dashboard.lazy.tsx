import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import './style.scss'
import { URLS } from '@constants'

const DashboardPage: FC = () => {
  return <article id="transfers-page" className="full-page-relative"></article>
}

export const Route = createLazyRoute(URLS.transfers.href)({
  component: DashboardPage
})
