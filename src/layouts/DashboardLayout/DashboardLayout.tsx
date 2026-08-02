import { useLayoutEffect, type FC } from 'react'
import { Outlet } from '@tanstack/react-router'
import { AsideMenu, DashboardHeader } from './_components'
import { useProfileData } from '@hooks';
import './DashboardLayout.scss'

export const DashboardLayout: FC = () => {
  const { updateProfileData } = useProfileData()

  useLayoutEffect(() => { 
    updateProfileData()
  }, [])
  
  return (
    <div className="dashboard-layout">
      <AsideMenu />
      <div className="dashboard-layout__container">
        <DashboardHeader />
        <main className="dashboard-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
