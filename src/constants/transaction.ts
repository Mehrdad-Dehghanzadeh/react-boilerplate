import type { TTransactionStatus, TTransactionType } from '@ts/Transactions'

export const TRANSACTION_STATUS: Record<TTransactionStatus, TMapperItem> = {
  success: {
    text: 'موفق',
    color: 'success'
  },

  failed: {
    text: 'ناموفق',
    color: 'error'
  },

  in_progress: {
    text: 'درحال انجام',
    color: 'yellow'
  }
}

export const TRANSACTION_TYPE: Record<TTransactionType, TMapperItem> = {
  sell: {
    text: 'فروش'
  },

  buy: {
    text: 'خرید'
  },

  deposit: {
    text: 'واریز'
  },

  withdraw: {
    text: 'برداشت'
  }
}
