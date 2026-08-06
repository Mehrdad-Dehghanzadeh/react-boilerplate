import type { Ref } from 'react'


export type TAddUserDialogHandle = {
  openDialog: () => void
}
export type TAddUserDialogProps = {
  ref: Ref<TAddUserDialogHandle>
  getData: () => void
}
