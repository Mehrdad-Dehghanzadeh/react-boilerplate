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
    subTitle: 'خوش آمدید',
    icon: 'DashboardIcon'
  },

  reportTransactions: {
    href: '/dashboard/report-transactions',
    title: 'گزارش تراکنش ها و تسویه',
    subTitle: 'مشاهده و مدیریت تراکنش‌ها و تسویه‌ها',
    icon: 'FileIcon'
  },

  accessUsers: {
    href: '/dashboard/access-users',
    title: 'مدیریت دسترسی',
    subTitle: 'مدیریت کاربران و سطوح دسترسی پنل',
    icon: 'UsersIcon',
    isAdmin: true
  },

  uikit: {
    href: '/ui-kit',
    title: 'uikit'
  }
})

export const DASHBOARD_NAV: TUrlList = [
  URLS.dashboard,
  URLS.reportTransactions,
  URLS.accessUsers
]
