// فعال ۱ - 2 غیر فعال
export type TMerchantStatus = '1' | '2'

export type TTransactions = {
  merchant_payable_amount: number
  remaining_amount: number
  sum_amount: number
}

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
