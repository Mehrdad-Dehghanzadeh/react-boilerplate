import type { TAccountItem, TRoles } from '@/ts/Common'
import { useState, type FC, useRef, useEffect } from 'react'
import { createLazyRoute } from '@tanstack/react-router'
import { ROLES_MAPPER, URLS } from '@constants'
import { Button, Chip, TableGrid, type TTableGridHeaders } from '@UIKit'
import { ProfileBadge } from '@shared'
import {
  AddUserDialog,
  type TAddUserDialogHandle,
  RemoveUserDialog,
  type TRemoveUserDialogHandle
} from './_components'
import { apis } from '@services'
import { deepClone, hasItem } from '@utils'
import TrashIcon from '@assets/svg/trash.svg?react'
import { useAccessUserStore } from '@store'

const AccessUsersPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<TAccountItem[]>([])
  const { setBranches } = useAccessUserStore()

  const addUserDialogRef = useRef<TAddUserDialogHandle>(null)
  const removeUserDialogRef = useRef<TRemoveUserDialogHandle>(null)

  const headers: TTableGridHeaders<TAccountItem> = [
    {
      title: 'کاربر',
      keyData: 'name',
      cellFC: (record) => (
        <span className="flex items-center">
          <ProfileBadge color="secondary" name={record?.last_name} />
          <strong className="mr-3">{`${record?.first_name || ''} ${record?.last_name || ''}`}</strong>
        </span>
      )
    },
    { title: 'موبایل', keyData: 'mobile' },
    {
      title: 'نقش',
      keyData: 'role',
      cellFC: (role) =>
        //@ts-ignore
        role ? <Chip>{ROLES_MAPPER[role]?.title}</Chip> : null
    },
    { title: 'شعبه', keyData: 'provider_name' },
    {
      title: 'عملیات',
      keyData: 'operation',
      cellStyle: { width: '90px' },
      cellFC: (record) => (
        <span
          className="remove-btn"
          role="button"
          onClick={() => {
            removeUserDialogRef?.current?.openDialog(record)
          }}
        >
          <TrashIcon />
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
        }

        if (hasItem(res?.data?.payload?.data?.branches)) {
          setBranches(deepClone(res?.data?.payload?.data?.branches))
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <article id="access-users-page" className="full-page-relative">
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className="ml-2">
            <h1>کاربر پنل</h1>
            <strong>۴ کاربر</strong>
          </div>

          <div></div>
        </div>

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
      <TableGrid data={data} headers={headers} loading={loading} />

      <AddUserDialog getData={getData} ref={addUserDialogRef} />
      <RemoveUserDialog getData={getData} ref={removeUserDialogRef} />
    </article>
  )
}

export const Route = createLazyRoute(URLS.accessUsers.href)({
  component: AccessUsersPage
})
