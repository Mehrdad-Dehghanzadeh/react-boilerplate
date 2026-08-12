import type { EnumMapper, TRoles } from '@ts/Common'
import type { TTicketStatus } from '@ts/Merchant'

export const ROLES_MAPPER: Record<TRoles, EnumMapper> = {
  admin: {
    title: 'مدیر پذیرنده'
  },
  reporter: {
    title: 'کاربر پذیرنده'
  },
  viewer: {
    title: 'بازیدکننده'
  }
}

export const TICKET_STATUS: Record<TTicketStatus, EnumMapper> = {
  CANCELED: {
    title: 'لغو',
    color: 'error'
  },

  EXPIRED: {
    title: 'ابطال',
    color: 'error'
  },

  FAILED: {
    title: 'خطا'
  },

  PENDING: {
    title: 'درانتظار',
    color: 'yellow'
  },

  REFUNDED: {
    title: 'مسترد'
  },

  REJECTED: {
    title: 'رد'
  },

  ROLLBACK: {
    title: 'بازگردانی',
    color: 'yellow'
  },

  SETTLED: {
    title: 'تسویه',
    color: 'success'
  },

  SUCCEED: {
    title: 'موفق'
  },

  VERIFIED: {
    title: 'تأیید',
    color: 'success'
  },

  VERIFYING: {
    title: 'در حال تأیید'
  }
}

export const TICKET_STATUS_LIST = [
  { title: 'لغو', value: 'CANCELED' },
  { title: 'تسویه', value: 'SETTLED' },
  { title: 'موفق', value: 'SUCCEED' },
  { title: 'تأیید', value: 'VERIFIED' },
  { title: 'در حال تأیید', value: 'VERIFYING' },
  { title: 'بازگردانی', value: 'ROLLBACK' },
  { title: 'رد', value: 'REJECTED' },
  { title: 'درانتظار', value: 'PENDING' },
  { title: 'خطا', value: 'FAILED' },
  { title: 'ابطال', value: 'EXPIRED' },
  { title: 'مسترد', value: 'REFUNDED' }
]
