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
    title: 'گزارش تراکنش ها',
    subTitle: 'مشاهده و مدیریت تراکنش‌ها',
    icon: 'FileIcon'
  },

  refunded: {
    href: '/dashboard/refunded',
    title: 'گزارش استرداد وجه',
    subTitle: 'گزارش استرداد وجه',
    icon: 'MoneyTick'
  },

  accessUsers: {
    href: '/dashboard/access-users',
    title: 'مدیریت دسترسی',
    subTitle: 'مدیریت کاربران و سطوح دسترسی پنل',
    icon: 'UsersIcon',
    isAdmin: true
  },

  profile: {
    href: '/dashboard/profile',
    title: 'پروفایل کاربر',
    subTitle: 'اطلاعات کاربر'
  },

  uikit: {
    href: '/ui-kit',
    title: 'uikit'
  }
})

export const DASHBOARD_NAV: TUrlList = [URLS.dashboard, URLS.refunded, URLS.accessUsers]
