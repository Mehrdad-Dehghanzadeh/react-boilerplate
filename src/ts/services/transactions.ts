import type { EWallet } from '@ts/Wallets'
import type { TTransactionItem } from '@ts/Transactions'
export interface IGetTransactionsPayload {
  wallet_type: EWallet
  last_id?: number
}

export interface ITransactionsServiceData {
  transactions: TTransactionItem[]
}
