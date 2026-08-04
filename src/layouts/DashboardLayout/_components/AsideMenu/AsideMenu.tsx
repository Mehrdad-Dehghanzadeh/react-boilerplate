import { type FC } from 'react'
import { DASHBOARD_NAV } from '@constants'
import { Link } from '@tanstack/react-router'
import DashboardIcon from '@assets/svg/dashboard.svg?react'
import UsersIcon from '@assets/svg/users.svg?react'
import FileIcon from '@assets/svg/file.svg?react'
import { useAppStore } from '@store'
import { getUserData } from '@utils'
import './AsideMenu.scss'

export const AsideMenu: FC = () => {
  const { profile } = useAppStore()

  const userData = getUserData()

  const iconMapper = (icon: string) => {
    const icons = {
      DashboardIcon: <DashboardIcon />,
      UsersIcon: <UsersIcon />,
      FileIcon: <FileIcon />
    }
    return icons?.[icon as keyof typeof iconMapper] || null
  }

  return (
    <aside className="aside-menu">
      <div className="aside-menu-logo">
        <div className="aside-menu-logo__img-wrapper">
          <img src="/imgs/logo.png" alt="Technopay" className="aside-menu-logo__img" />
        </div>
        <div>
          <div className="font-bold">تکنوپی</div>
          <div className="aside-menu-logo__text">MERCHANT</div>
        </div>
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
        <div className="aside-menu-profile__avatar">
          {profile?.account?.last_name?.[0] || ''}
        </div>
        <div className="aside-menu-profile__content">
          <div className="aside-menu-profile__name">
            <span className="ml-1">{profile?.account?.first_name || ''}</span>
            <span>{profile?.account?.last_name || ''}</span>
          </div>
          <div className="aside-menu-profile__subname">پذیرنده فعال</div>
        </div>
      </div>
    </aside>
  )
}
