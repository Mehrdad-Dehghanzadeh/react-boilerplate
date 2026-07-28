import { deepFreeze } from '@utils'

export const URLS = deepFreeze<TUrls>({
  home: {
    href: '/',
    title: 'صفحه اصلی'
  },

  login: {
    href: '/login',
    title: 'ورود'
  },

  dashboard: {
    href: '/dashboard',
    title: 'داشبورد',
    icon: 'DashboardIcon'
  },

  reportTransactions: {
    href: '/dashboard/report-transactions',
    title: 'گزارش تراکنش ها و تسویه',
    icon: 'FileIcon'
  },

  accessUsers: {
    href: '/dashboard/access-users',
    title: 'مدیریت دسترسی',
    icon: 'UsersIcon'
  }
})

export const DASHBOARD_NAV: TUrlList = [
  URLS.dashboard,
  URLS.reportTransactions,
  URLS.accessUsers
]
