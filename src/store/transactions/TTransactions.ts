import type { TCreditTickets } from '@ts/Merchant'

export type TTransactionsStates = {
  loading: boolean
  transactionsData: TCreditTickets[] | null
}

export type TTransactionsStore = TTransactionsStates & {
  setLoading: (loading: boolean) => void
  setTransactionsData: (data: TCreditTickets[]) => void
}
