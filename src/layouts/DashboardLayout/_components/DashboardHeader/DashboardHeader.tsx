import { type FC } from 'react'
import './DashboardHeader.scss'
import { useAppStore } from '@store'
import { ROLES_MAPPER, URLS } from '@constants'
import { apis } from '@services'
import { handleResponseError, deleteAllCookie } from '@utils'
import { useNavigate } from '@tanstack/react-router'

export const DashboardHeader: FC = () => {
  const navigation = useNavigate()

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
        <div className="min-w-0">
          <div className="dashboard-header__page-name">مدیریت دسترسی</div>
          <div data-dc-tpl="35" className="dashboard-header__description">
            مدیریت کاربران و سطوح دسترسی پنل
          </div>
        </div>
      </div>

      <div className="dashboard-header-avatar">
        <a className="dashboard-header-avatar__wrapper">
          <div className="dashboard-header-avatar__circle">
            {profile?.account?.last_name?.[0] || ''}
          </div>
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
          <svg
            data-dc-tpl="42"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#AEAEA8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path data-dc-tpl="43" d="M6 9l6 6 6-6"></path>
          </svg>
        </a>

        <button className="dashboard-header-avatar__logout" title="خروج" onClick={logout}>
          <svg
            data-dc-tpl="45"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DE3730"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path data-dc-tpl="46" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <path data-dc-tpl="47" d="M16 17l5-5-5-5M21 12H9"></path>
          </svg>
        </button>
      </div>
    </header>
  )
}
