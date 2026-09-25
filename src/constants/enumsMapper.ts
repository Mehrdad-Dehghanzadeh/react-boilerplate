import type { EnumMapper, TRoles } from '@ts/Common'
import type { TRefundStatus, TSettlementItemStatus, TTicketStatus } from '@ts/Merchant'

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

  PARTIAL_REFUNDED: {
    title: 'استرداد'
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

export const REFUND_STATUS: Record<TRefundStatus, EnumMapper> = {
  CANCELED: {
    title: 'استرداد لغو شده',
    color: 'error'
  },

  PENDING: {
    title: 'در انتظار تایید',
    color: 'yellow'
  },

  REJECTED: {
    title: 'استرداد رد شده',
    color: 'error'
  },

  APPROVED: {
    title: 'استرداد تایید شده',
    color: 'success'
  }
}

export const REFUND_STATUS_LIST = [
  { title: 'استرداد لغو شده', value: 'CANCELED' },
  { title: 'استرداد تایید شده', value: 'APPROVED' },
  { title: 'استرداد رد شده', value: 'REJECTED' },
  { title: 'در انتظار تایید', value: 'PENDING' }
]

export const SETTLEMENT_STATUS: Record<TSettlementItemStatus, EnumMapper> = {
  '1': {
    title: 'در انتظار تسویه',
    color: 'yellow'
  },

  '2': {
    title: 'تسویه شده',
    color: 'success'
  },

  '3': {
    title: 'رد شده',
    color: 'error'
  },

  '4': {
    title: 'سفارش بروز شده',
    color: 'success'
  },
  '5': {
    title: 'استرداد  کامل',
    color: 'success'
  },
  '6': {
    title: 'استرداد بخشی از مبلغ',
    color: 'success'
  },
  '7': {
    title: 'استرداد پیش از تسویه',
    color: 'success'
  }
}

export const SETTLEMENT_STATUS_LIST = [
  { title: 'استرداد لغو شده', value: '1' },
  { title: 'تسویه شده', value: '2' },
  { title: 'رد شده', value: '3' },
  { title: 'سفارش بروز شده', value: '4' },
  { title: 'استرداد  کامل', value: '5' },
  { title: 'استرداد بخشی از مبلغ', value: '6' },
  { title: 'استرداد پیش از تسویه', value: '7' }
]
