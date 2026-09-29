import { type FC, useLayoutEffect, useState } from 'react'
import { createLazyRoute, getRouteApi, useNavigate } from '@tanstack/react-router'
import { PaginationTable, NoDataSection } from './_components'
import ArrowLeftIcon from '@assets/svg/arrow-left.svg?react'
import { URLS } from '@constants'

const RouteApi = getRouteApi(URLS.settlementDetails.href)

const DashboardPage: FC = () => {
  const navigate = useNavigate()
  const [section, setSection] = useState<'nodata' | 'table' | 'none'>('none')

  const queryParams = RouteApi.useSearch()

  const goBack = () => {
    navigate({
      to: URLS.deposit.href,

      search: {
        initialSlide: 1
      }
    })
  }

  useLayoutEffect(() => {
    if (queryParams.settlement_id) {
      setSection('table')
    } else {
      setSection('nodata')
    }
  }, [])

  return (
    <article id="dashboard-settlement-id">
      <div className="py-3 border-b border-[#0000001A] mb-4">
        <span
          role="button"
          className="flex items-center text-[#4D637B] pointer-none"
          onClick={goBack}
        >
          <ArrowLeftIcon />
          <span className="mr-2">بازگشت</span>
        </span>
      </div>

      {section == 'nodata' && <NoDataSection />}
      {section === 'table' && <PaginationTable />}
    </article>
  )
}

export const Route = createLazyRoute(`${URLS.settlementDetails.href}`)({
  component: DashboardPage
})
