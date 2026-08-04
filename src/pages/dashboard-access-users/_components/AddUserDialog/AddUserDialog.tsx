import type { TAddUserDialogProps } from './TAddUserDialog'
import { useImperativeHandle, type FC, useState, useEffect } from 'react'
import { Modal } from '@UIKit'

export const AddUserDialog: FC<TAddUserDialogProps> = ({ ref }) => {
  const [open, setOpen] = useState<boolean>(false)

  const openDialog = () => {
    setOpen(true)
  }

  useImperativeHandle(
    ref,
    () => ({
      openDialog
    }),
    []
  )

  useEffect(() => {}, [open])

  return (
    <Modal size="sm" open={open} setOpen={setOpen} title="افزودن کاربر جدید">
      <form></form>
    </Modal>
  )
}
