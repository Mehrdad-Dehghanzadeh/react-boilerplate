import type { TAccountItem } from '@/ts/Common'
import type { TRemoveUserDialogProps } from './TRemoveUserDialog'
import { useImperativeHandle, type FC, useState, useEffect } from 'react'
import { Button, Modal } from '@UIKit'
import { deepClone, handleResponseError } from '@/utils'
import { apis } from '@/services'

export const RemoveUserDialog: FC<TRemoveUserDialogProps> = ({ ref, getData }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [record, setRecord] = useState<TAccountItem | null>(null)

  const openDialog = (recordItem: TAccountItem) => {
    setOpen(true)
    setRecord(deepClone(recordItem))
  }

  const close = () => {
    setOpen(false)
    setLoading(false)
  }

  const clearData = () => {
    if (!open) {
      setRecord(null)
    }
  }

  const removeUser = () => {
    setLoading(true)
    if (record) {
      apis.auth
        .removeUser(record?.id)
        .then(() => {
          getData()
          close()
        })
        .catch((e) => {
          handleResponseError(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      openDialog
    }),
    []
  )

  useEffect(() => {
    clearData()
  }, [open])

  return (
    <Modal size="sm" open={open} setOpen={setOpen} preventClose>
      <h2 className="mx-auto text-center font-bold py-2">حذف کاربر</h2>
      <p className="text-center mb-4 flex justify-center">
        <span>آیا از حذف</span>
        <strong className="mx-1">{`${record?.first_name || ''}  ${record?.last_name || ''}`}</strong>
        <span>مطمئن هستید؟ این عمل قابل بازگشت نیست.</span>
      </p>

      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="outlined"
          className="ml-3"
          onClick={close}
          disabled={loading}
        >
          انصراف
        </Button>

        <Button type="button" color="error" onClick={removeUser}>
          حذف کاربر
        </Button>
      </div>
    </Modal>
  )
}
