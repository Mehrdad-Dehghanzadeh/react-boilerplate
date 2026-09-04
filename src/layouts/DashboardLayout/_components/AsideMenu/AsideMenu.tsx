import { type FC } from 'react'
import { DASHBOARD_NAV } from '@constants'
import { Link } from '@tanstack/react-router'
import DashboardIcon from '@assets/svg/dashboard.svg?react'
import UsersIcon from '@assets/svg/users.svg?react'
import FileIcon from '@assets/svg/file.svg?react'
import DoorIcon from '@assets/svg/Door.svg?react'
import { useAppStore } from '@store'
import { getUserData, handleResponseError, deleteAllCookie } from '@utils'
import { apis } from '@services'
import { URLS } from '@constants'
import { useNavigate } from '@tanstack/react-router'
import LogoIcon from '@assets/svg/logo-1.svg?react'
import './AsideMenu.scss'

export const AsideMenu: FC = () => {
  const { profile } = useAppStore()
  const navigation = useNavigate()

  const userData = getUserData()

  const iconMapper = (icon: string) => {
    const icons = {
      DashboardIcon: <DashboardIcon />,
      UsersIcon: <UsersIcon />,
      FileIcon: <FileIcon />
    }
    return icons?.[icon as keyof typeof iconMapper] || null
  }

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
    <aside className="aside-menu">
      <div className="aside-menu-logo">
        <LogoIcon className='h-10'/>
      </div>

      <nav className="aside-menu-nav">
        {DASHBOARD_NAV.map((el, index) =>
          Boolean(
            !el?.isAdmin || [profile?.account?.role, userData?.role].includes('admin')
          ) ? (
            <Link
              className="aside-menu-nav__link"
              to={el?.href}
              key={`${index}-${el?.href}`}
              activeOptions={{ exact: true }}
            >
              <span className="aside-menu-nav__icon">{iconMapper(el?.icon)}</span>
              <span className="aside-menu-nav__text">
                <span className="sc-interp">{el?.title}</span>
              </span>
            </Link>
          ) : null
        )}
      </nav>

      <div className="aside-menu-profile">
        <span
          className="flex items-center text-error w-full"
          role="button"
          onClick={logout}
        >
          <DoorIcon className="w-6 h-6 ml-1" />
          <span>خروج</span>
        </span>
      </div>
    </aside>
  )
}
