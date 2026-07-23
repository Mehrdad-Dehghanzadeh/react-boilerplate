export type TTransactionType = 'sell' | 'buy' | 'deposit' | 'withdraw'
export type TTransactionStatus = 'success' | 'failed' | 'in_progress'

export type TTransactionItem = {
  id: number
  fee_amount: number
  created_at: string
  price: number
  total_amount: number
  amount: number
  status: TTransactionStatus
  transaction_type: TTransactionType
  volume: number
  iban?: string
}
