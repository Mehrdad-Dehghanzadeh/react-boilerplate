import type { Ref } from 'react'

export type TTransactionsDetailsDialogRef = {
  openDialog: (data: any)  => void
}

export type TTransactionsDetailsDialogProps = {
  ref: Ref<TTransactionsDetailsDialogRef>
}
