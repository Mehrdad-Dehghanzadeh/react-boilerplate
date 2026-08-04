import { useEffect, type FC } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import './style.scss'
import { URLS } from '@constants'
import { apis } from '@/services';

const DashboardPage: FC = () => {
  useEffect(() => { 
    apis.report.home()
  }, [])
  return <article id="transfers-page" className="full-page-relative"></article>
}

export const Route = createLazyRoute(URLS.dashboard.href)({
  component: DashboardPage
})
