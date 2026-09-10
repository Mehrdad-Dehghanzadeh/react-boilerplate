import { useLayoutEffect, useState, type FC } from 'react'
import { Outlet } from '@tanstack/react-router'
import { AsideMenu, DashboardHeader } from './_components'
import { useProfileData } from '@hooks'
import './DashboardLayout.scss'
import { SpinnerLoading } from '@/components/UIKit'

export const DashboardLayout: FC = () => {
  const { updateProfileData } = useProfileData()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      await updateProfileData()
    } finally {
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="dashboard-layout">
      <AsideMenu />
      <div className="dashboard-layout__container">
        <DashboardHeader />
        {loading ? (
          <div className='dashboard-layout__loading'>
            <SpinnerLoading loading={loading} />
          </div>
        ) : (
          <main className="dashboard-layout__main">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  )
}
