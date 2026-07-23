import { deepFreeze } from '@utils'
import PlusREC from '@assets/svg/plus-rec-2.svg?react'
import ArrowTopRec from '@assets/svg/arrow-top-rec.svg?react'
import HistoryRec from '@assets/svg/history-rec.svg?react'
import CreditCard from '@assets/svg/credit-card.svg?react'
import Question from '@assets/svg/question.svg?react'

export const URLS = deepFreeze<TUrls>({
  home: {
    href: '/',
    title: 'صفحه اصلی'
  },

  buy: {
    href: '/buy-and-sell',
    title: 'خرید'
  },

  sell: {
    href: '/buy-and-sell#Sell',
    title: 'فروش'
  },

  transfers: {
    href: '/transfers',
    title: 'واریز به کیف'
  },

  transfersWithdraw: {
    href: '/transfers#Withdraw',
    title: 'برداشت از کیف'
  },

  history: {
    href: '/history',
    title: 'تاریخچه'
  },

  cartManagement: {
    href: '/cart-management',
    title: 'مدیریت کارت‌ها'
  },

  FAndQ: {
    href: '/f-and-q',
    title: 'راهنما'
  },

  orderPhysical: {
    href: '/order-physical',
    title: 'خرید فیزیکی'
  },

  silverDeposit: {
    href: '/silver-deposit',
    title: 'نقره قسطی'
  }
})

export const HOME_URLS = deepFreeze<TUrlList>([
  {
    href: URLS.transfers.href,
    title: URLS.transfers.title || '',
    icon: PlusREC,
    needKyc: true
  },

  {
    href: URLS.transfersWithdraw.href,
    title: URLS.transfersWithdraw.title || '',
    icon: ArrowTopRec,
    needKyc: true
  },

  {
    href: URLS.history.href,
    title: URLS.history.title || '',
    icon: HistoryRec
  },

  {
    href: URLS.cartManagement.href,
    title: URLS.cartManagement.title || '',
    icon: CreditCard
  },

  {
    href: URLS.FAndQ.href,
    title: URLS.FAndQ.title,
    icon: Question
  }
])

export const PATHS_SHOW_TOP_BAR = deepFreeze<string[]>([
  URLS.home.href,
  URLS.buy.href,
  URLS.sell.href
])
