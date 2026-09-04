import { type FC } from 'react'
import { useAppStore } from '@store'
import { ROLES_MAPPER, URLS } from '@constants'
import { apis } from '@services'
import { handleResponseError, deleteAllCookie } from '@utils'
import { useNavigate, useLocation } from '@tanstack/react-router'
import UserOctagon from '@assets/svg/user-octagon.svg?react'
import './DashboardHeader.scss'

export const DashboardHeader: FC = () => {
  const navigation = useNavigate()

  const pathname = useLocation({
    select: (location) => location.pathname
  })

  const findTitle = () => {
    const field = Object.values(URLS).find((el) => el.href === pathname)

    return {
      title: field?.title || '',
      subTitle: field?.subTitle || ''
    }
  }

  const headerText = findTitle()

  const { profile } = useAppStore()
  const logout = () => {
    apis.auth
      .logout()
      .then(() => {})
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        deleteAllCookie()
        navigation({ to: URLS.login.href, replace: true })
      })
  }
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__content">
        <UserOctagon className="w-12 h-12 text-secondary" />

        <div className="leading-[1.3]">
          <div className="dashboard-header-avatar__title">
            <span className="ml-1">{`${profile?.account?.first_name || ''}`}</span>
            <span>{`${profile?.account?.last_name || ''}`}</span>
          </div>

          <div className="dashboard-header-avatar__sub-title">
            {profile?.account?.role &&
            ['admin', 'reporter'].includes(profile?.account?.role)
              ? ROLES_MAPPER[profile?.account?.role]?.title
              : ''}
          </div>
        </div>
      </div>
    </header>
  )
}
