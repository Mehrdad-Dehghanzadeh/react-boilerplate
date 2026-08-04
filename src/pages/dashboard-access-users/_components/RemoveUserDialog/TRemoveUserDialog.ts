import type { Ref } from 'react'
import type { TAccountItem } from '@/ts/Common'

export type TRemoveUserDialogHandle = {
  openDialog: (record: TAccountItem) => void
}
export type TRemoveUserDialogProps = {
  ref: Ref<TRemoveUserDialogHandle>
  getData: () => void
}
