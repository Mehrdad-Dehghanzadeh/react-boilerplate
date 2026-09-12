import type { TAccountItem } from '@/ts/Common'
import { useState, type FC, useRef, useEffect } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { ROLES_MAPPER, URLS } from '@constants'
import { Button, Chip, TableGrid, type TTableGridHeaders, Clipboard } from '@UIKit'
import {
  AddUserDialog,
  type TAddUserDialogHandle,
  RemoveUserDialog,
  type TRemoveUserDialogHandle,
  FiltersTable
} from './_components'
import { apis } from '@services'
import { deepClone, handleResponseError, hasItem } from '@utils'
import EditIcon from '@assets/svg/edit.svg?react'
import { useAccessUserStore } from '@store'
import { flushSync } from 'react-dom'

const AccessUsersPage: FC = () => {
  const [records, setRecords] = useState<TAccountItem[]>([])
  const { setBranches, setData, setEditRecord, editRecord, loading, setLoading } =
    useAccessUserStore()

  const addUserDialogRef = useRef<TAddUserDialogHandle>(null)
  const removeUserDialogRef = useRef<TRemoveUserDialogHandle>(null)

  const headers: TTableGridHeaders<TAccountItem> = [
    {
      title: 'کاربر',
      keyData: 'name',
      cellFC: (record) => (
        <span className="flex items-center">
          <strong className="mr-3">{`${record?.first_name || ''} ${record?.last_name || ''}`}</strong>
        </span>
      )
    },

    {
      title: 'وضعیت',
      cellFC: (record) =>
        //@ts-ignore
        {
          return (
            <Chip color={record?.status ? 'success' : 'error'}>
              {record?.status ? 'فعال' : 'غیر فعال'}
            </Chip>
          )
        }
    },

    {
      title: 'نقش',
      keyData: 'role',
      cellFC: (role) =>
        //@ts-ignore
        role ? <Chip>{ROLES_MAPPER[role]?.title}</Chip> : null
    },

    {
      title: 'موبایل',
      keyData: 'mobile',
      cellFC: (mobile) =>
        //@ts-ignore
        mobile ? <Clipboard value={mobile}>{mobile}</Clipboard> : null
    },
    { title: 'شعبه', keyData: 'provider_name' },

    {
      title: 'عملیات',
      keyData: 'operation',
      cellStyle: { width: '90px' },
      cellFC: (record) => (
        <span className="flex gap-3 items-center">
          {!Boolean(record?.merchant_id) && (
            <>
              {/* <span
                className="remove-btn"
                role="button"
                onClick={() => {
                  removeUserDialogRef?.current?.openDialog(record)
                }}
              >
                <TrashIcon />
              </span> */}
              <span
                className="edit-btn"
                role="button"
                onClick={() => {
                  setEditRecord({ ...record })
                  flushSync(() => {
                    console.log(editRecord)
                    addUserDialogRef?.current?.openDialog()
                  })
                }}
              >
                <EditIcon />
                <span className="mr-1">ویرایش</span>
              </span>
            </>
          )}
        </span>
      )
    }
  ]

  const getData = () => {
    setLoading(true)

    apis.auth
      .getUser()
      .then((res) => {
        if (hasItem(res?.data?.payload?.data?.accounts)) {
          setData(deepClone(res?.data?.payload?.data?.accounts))
          setRecords(deepClone(res?.data?.payload?.data?.accounts))
        }

        if (hasItem(res?.data?.payload?.data?.branches)) {
          setBranches(deepClone(res?.data?.payload?.data?.branches))
        }
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <article id="access-users-page" className="full-page-relative">
      <h1 className="text-primary text-xl font-black">مدیریت دسترسی</h1>

      <div className="flex justify-end my-3 ">
        <Button
          className="max-w-[120px]"
          type="button"
          onClick={() => {
            addUserDialogRef?.current?.openDialog()
          }}
        >
          افزودن کاربر
        </Button>
      </div>

      <FiltersTable setRecords={setRecords} />
      <TableGrid data={records} headers={headers} loading={loading} />
      <AddUserDialog getData={getData} ref={addUserDialogRef} />
      <RemoveUserDialog getData={getData} ref={removeUserDialogRef} />
    </article>
  )
}

export const Route = createLazyRoute(URLS.accessUsers.href)({
  component: AccessUsersPage
})
