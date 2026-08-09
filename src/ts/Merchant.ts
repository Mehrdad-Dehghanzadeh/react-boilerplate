// فعال ۱ - 2 غیر فعال
export type TMerchantStatus = '1' | '2'
export type TCreditTickets = {
  id: number //شناسه
  merchantable_type: TMerchantTypes //
  merchantable_id: number // Cashier
  customer_id: number //
  ticket_number: string //
  track_number: string // شماره تراکنش
  amount: number // مبلغ
  channel: number
  merchant_payable_amount: number
  remaining_amount: number
  wallet_balance: number
  status: TTicketStatus
  paid_at: null | string
  created_at: string
  updated_at: string
}

export type TTransactions = {
  merchant_payable_amount: number
  remaining_amount: number
  sum_amount: number
}

export type TTicketStatus =
  | 'SETTLED'
  | 'EXPIRED'
  | 'ROLLBACK'
  | 'CANCELED'
  | 'FAILED'
  | 'VERIFYING'
  | 'VERIFIED'
  | 'REJECTED'
  | 'REFUNDED'
  | 'SUCCEED'
  | 'PENDING'

export type TMerchantTypes = 'merchant_cashier' | 'merchant_branch'

export type TBranch = {
  id: number
  store_name: string
  manager_name: string
  manager_family: string
  manager_mobile: string
  type: string
  status: string
  created_at: string
  transactions?: TTransactions | null
  transactions_refunded?: TTransactions | null
  transactions_settled?: TTransactions | null
  transaction_online: TTransactions | null
  transaction_offline: TTransactions | null
  credit_tickets: TCreditTickets[]
}

export type TMerchantStore = {
  id: number
  status: TMerchantStatus
  manager_name: string
  manager_family: string
  manager_email: string
  manager_mobile: string
  merchant_type: string
  created_at: string
  branches: TBranch[]
}

