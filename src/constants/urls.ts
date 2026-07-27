import { deepFreeze } from '@utils'

export const URLS = deepFreeze<TUrls>({
  home: {
    href: '/',
    title: 'صفحه اصلی'
  },

  login: {
    href: '/login',
    title: 'ورود'
  }
})
