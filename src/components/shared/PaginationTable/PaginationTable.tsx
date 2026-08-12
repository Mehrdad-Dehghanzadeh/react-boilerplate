import type { IHomeRes, IHomePayload } from '@ts/services/Report'
import type { TColor } from '@ts/Colors'
import type { TCreditTickets, TTicketStatus } from '@ts/Merchant'
import type { TPaginationTableProps } from './TPaginationTable'
import { useEffect, useRef, useState, type FC } from 'react'
import { Chip, SelectField, TableGrid, type TTableGridHeaders } from '@UIKit'
import { useForm } from 'react-hook-form'
import { clsx } from 'clsx'
import { apis } from '@services'
import { TICKET_STATUS } from '@constants'
import { getUserData, handleResponseError, hasItem, price, utcToJalaali } from '@utils'
import SpinnerSVG from '@assets/svg/spinner.svg?react'
import { useTransactionsStore } from '@store'
import { FilterTable } from '@pages/dashboard-report-transactions/_components'
import './PaginationTable.scss'

export const PaginationTable: FC<TPaginationTableProps> = ({ openDialog }) => {
  const [data, setData] = useState<TCreditTickets[]>([])
  const [page, setPage] = useState<number>(1)
  const [indexLoading, setIndexLoading] = useState<number>(0)
  const { branches, setBranches, setLoading } = useTransactionsStore()

  const { control, watch } = useForm({
    defaultValues: { pageSize: 10 }
  })

  const totalData = useRef<TCreditTickets[]>([])

  const pageSize = watch('pageSize')

  const headers: TTableGridHeaders = [
    { title: ' شماره تراکنش', keyData: 'ticket_number' },
    {
      title: 'نوع تراکنش',
      keyData: 'merchantable_type',
      cellFC: (merchantable_type) => (
        <span>{merchantable_type === 'merchant_cashier' ? 'آفلاین' : 'آنلاین'}</span>
      )
    },

    {
      title: 'وضعیت تراکنش',
      keyData: 'status',
      cellFC: (status: TTicketStatus) => (
        <Chip color={(TICKET_STATUS[status]?.color as TColor) || 'default'}>
          {TICKET_STATUS[status]?.title}
        </Chip>
      )
    },

    {
      title: 'تاریخ تراکنش',
      keyData: 'created_at',
      cellFC: (created_at: string) => (
        <span className="sc-interp">
          {created_at ? utcToJalaali(created_at || '') : ''}
        </span>
      )
    },

    {
      title: 'مبلغ',
      keyData: 'amount',
      cellFC: (amount) => <span>{price(amount)}</span>
    },
    {
      title: 'جزئیات',
      cellStyle: { width: '80px' },
      cellFC: (record) => (
        <button
          className="btn-2 block"
          onClick={() => {
            customerInfo(record)
          }}
        >
          {indexLoading === record?.customer_id ? (
            <SpinnerSVG className="spinner" />
          ) : (
            'جزئیات'
          )}
        </button>
      )
    }
  ]

  const pages = [1, 2, 3, 4, 5]

  const updateData = () => {
    const startIndex = (page - 1) * pageSize
    const pageData = totalData.current.slice(startIndex, startIndex + pageSize)
    setData(pageData)
  }

  const setBranchOptions = (data: IHomeRes) => {
    const temp = hasItem(data?.merchant_store?.branches)
      ? data?.merchant_store?.branches?.map((el) => ({
          value: el?.id,
          title: el?.store_name
        }))
      : []

    temp?.unshift({ title: 'همه شعب', value: 0 })

    setBranches(temp)
  }

  const handleDataRes = (data: IHomeRes, branchId: number | undefined) => {
    const userData = getUserData()
    if (branches.length <= 1) {
      setBranchOptions(data)
    }

    if (branchId || !Boolean(userData?.merchant_id)) {
      const branch = data?.merchant_store?.branches[0]
      totalData.current = branch ? [...totalData.current, ...branch?.credit_tickets] : []
    } else {
      totalData.current = [...totalData.current, ...data?.merchant_store?.credit_tickets]
    }

    updateData()
  }

  const customerInfo = (record: TCreditTickets) => {
    const customer_id = record?.customer_id
    setIndexLoading(customer_id)

    apis.report
      .customerInfo({ customer_id })
      .then((res) => {
        openDialog({ record, ...res?.data?.payload?.data })
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => setIndexLoading(0))
  }

  const getDataTable = (payload?: IHomePayload) => {
    setLoading(true)

    apis.report
      .home(payload)
      .then((res) => {
        handleDataRes(res?.data?.payload?.data, payload?.provider_branch_id)
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const refreshTable = (payload?: IHomePayload) => {
    totalData.current = []
    setData([])
    getDataTable(payload)
  }

  useEffect(() => {
    getDataTable()
  }, [])

  useEffect(() => {
    updateData()
  }, [page])

  useEffect(() => {
    if (page == 1) {
      updateData()
    } else {
      setPage(1)
    }
  }, [pageSize])

  return (
    <div>
      <FilterTable getData={refreshTable} />
      <TableGrid className="pagination-table-grid" headers={headers} data={data} />
      <div className="pagination-table">
        <div className="pagination-table__size">
          <span data-dc-tpl="118">نمایش</span>
          <SelectField
            control={control}
            name="pageSize"
            options={[
              { title: '10', value: 10 },
              { title: '20', value: 20 },
              { title: '30', value: 30 }
            ]}
          />
          <span>
            <span className="sc-interp"></span>
          </span>
        </div>

        <div className="pagination-table__pages">
          <button className="tp-icnbtn pagination-table__left-chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path data-dc-tpl="126" d="M9 18l6-6-6-6"></path>
            </svg>
          </button>

          {pages?.map((pageItem) => (
            <button
              key={pageItem}
              className={clsx('pagination-table__page-btn', {
                'pagination-table__page-btn--active': page == pageItem
              })}
              onClick={() => {
                setPage(pageItem)
              }}
            >
              <span className="sc-interp">{pageItem}</span>
            </button>
          ))}

          <button data-dc-tpl="129" className="tp-icnbtn pagination-table__right-chevron">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
