import { type FC } from 'react'
import { Outlet } from '@tanstack/react-router'

export const DashboardLayout: FC = () => {
  return (
    <>
      <header></header>
      <main className="dashboard-layout-main">
        <Outlet />
      </main>
    </>
  )
}
