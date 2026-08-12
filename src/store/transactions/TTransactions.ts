export type TTransactionsStates = {
  loading: boolean
  branches: { title: string; value: string | number }[]
}

export type TTransactionsStore = TTransactionsStates & {
  setLoading: (loading: boolean) => void
  setBranches: (branches: { title: string; value: string | number }[]) => void
}
