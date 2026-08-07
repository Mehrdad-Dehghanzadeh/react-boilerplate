import { type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { URLS } from '@constants'
import { DashboardFilters, ChannelSellSection, BranchesSellSection } from './_components'
import './style.scss'

const DashboardPage: FC = () => {
  return (
    <article id="transfers-page" className="full-page-relative">
      <DashboardFilters />

      <div className="flex gap-4">
        <BranchesSellSection />
        <ChannelSellSection />
      </div>
    </article>
  )
}

export const Route = createLazyRoute(URLS.dashboard.href)({
  component: DashboardPage
})
