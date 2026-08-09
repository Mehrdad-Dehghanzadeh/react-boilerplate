import type { TCreditTickets } from '@ts/Merchant'
import { useEffect, useRef, useState, type FC } from 'react'
import { SelectField, TableGrid, type TTableGridHeaders } from '@UIKit'
import { useForm } from 'react-hook-form'
import { clsx } from 'clsx'
import { apis } from '@services'
import { price } from '@utils'
import './PaginationTable.scss'

export const PaginationTable: FC = () => {
  const [data, setData] = useState<TCreditTickets[]>([])
  const [page, setPage] = useState<number>(1)

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
      cellFC: (status) => <span>{status}</span>
    },
    {
      title: 'مبلغ',
      keyData: 'amount',
      cellFC: (amount) => <span>{price(amount)}</span>
    },
    {
      title: 'جزئیات',
      cellStyle: { width: '80px' },
      cellFC: (record) => <button className="btn-2">جزئیات</button>
    }
  ]

  const pages = [1, 2, 3, 4, 5]

  const updateData = () => {
    const startIndex = (page - 1) * pageSize
    const pageData = totalData.current.slice(startIndex, startIndex + pageSize)
    setData(pageData)
  }

  useEffect(() => {
    apis.report
      .home()
      .then((res) => {
        totalData.current = [
          ...totalData.current,
          ...res?.data?.payload?.data?.merchant_store?.credit_tickets
        ]

        updateData()
      })
      .catch(() => {})
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
