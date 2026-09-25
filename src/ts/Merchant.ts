import type { ICustomerInfoRes } from './services/Report'

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
  name: string
  family: string
}

export type TRefund = {
  id: number
  requested_amount: number
  amount: number
  status: TRefundStatus
  created_at: string
  mobile: string
  name: string
  family: string
  store_name: string
  track_number: string
}

export type TTransactions = {
  merchant_payable_amount: number
  remaining_amount: number
  sum_amount: number
}

export type TSettlement = {
  id: number
  gross_amount: number
  commission_rate: number
  commission_amount: number
  vat_rate: number
  vat_amount: number
  net_amount: number
  status: string
  created_at: string
  name: string
  family: string
  mobile: string
  amount: number
  track_number: string
  settled_at: string
  settlement_created_at: string
  bank_reference: string
  store_name: string
  refund_id: number | null
  original_settled_amount: number | null
  revised_amount: number | null
  debt_amount: number | null
  refund_type: string | null
  refund_bank_reference: string | null
  refund_status: string | null
  refund_created_at: string | null
  child_id: number | null
  child_gross_amount: number | null
  child_commission_rate: number | null
  child_commission_amount: number | null
  child_vat_rate: number | null
  child_vat_amount: number | null
  child_net_amount: number | null
  child_status: number | null
  child_created_at: string | null
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
  | 'PARTIAL_REFUNDED'

export type TRefundStatus = 'PENDING' | 'APPROVED' | 'CANCELED' | 'REJECTED'

export type TMerchantTypes = 'merchant_cashier' | 'merchant_branch'

export type TBranch = {
  credit_ticket_refunded: any
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
  credit_ticket_settlement: TSettlement[]
  credit_ticket_settlement_items: TSettlement[]
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
  credit_ticket_settlement: TSettlement[]
}

export type TCustomerDetails = ICustomerInfoRes & {
  record: TCreditTickets
}
