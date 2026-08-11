import { useRef, type FC } from 'react'
import { PaginationTable } from '@shared'
import { TransactionsDetailsDialog, type TTransactionsDetailsDialogRef } from '../'

export const TransactionsTab: FC = () => {
  const dialogRef = useRef<TTransactionsDetailsDialogRef>(null)

  const openDialog = (data: any) => {
    dialogRef?.current?.openDialog(data)
  }

  return (
    <section id="transaction-tab">
      <PaginationTable openDialog={openDialog} />

      <TransactionsDetailsDialog ref={dialogRef} />
    </section>
  )
}
