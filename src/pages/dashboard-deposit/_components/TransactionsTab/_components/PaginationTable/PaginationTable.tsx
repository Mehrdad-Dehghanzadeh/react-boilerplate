import type { IHomeRes, ISettlementPayload } from '@ts/services/Report'
import type { TCsvColumns } from '@ts/Common'
import type { TSettlement } from '@ts/Merchant'
import type { TPaginationTableProps } from './TPaginationTable'
import { useEffect, useRef, useState, type FC } from 'react'
import { TableGrid, type TTableGridHeaders, Clipboard } from '@UIKit'
import { useForm } from 'react-hook-form'
import { apis } from '@services'
import { getUserData, handleResponseError, hasItem, price, utcToJalaali } from '@utils'
import { useAppStore, useDeposit } from '@store'
import { FilterTable } from '../'
import ArrowRightIcon from '@assets/svg/arrow-right.svg?react'
import { useNavigate } from '@tanstack/react-router'
import { URLS } from '@constants'
import './PaginationTable.scss'

const ExcelColumns: TCsvColumns = [
  {
    title: 'ردیف',
    dataIndex: 'row'
  },
  {
    title: 'شناسه',
    dataIndex: 'id'
  },
  { title: 'نام شعبه', dataIndex: 'store_name' },

  {
    title: 'شماره تراکنش بانکی',
    dataIndex: 'bank_reference'
  },

  {
    title: 'شماره حساب واریزی',
    dataIndex: 'iban_snapshot'
  },

  {
    title: 'مبلغ ناخالص',
    dataIndex: 'gross_amount'
  },

  {
    title: 'مبلغ خالص',
    dataIndex: 'total_payable'
  },

  {
    title: 'تعداد سفارشات تسویه شده',
    dataIndex: 'total_payable'
  },

  {
    title: 'تاریخ تسویه',
    dataIndex: 'settled_at'
  }
]

export const PaginationTable: FC<TPaginationTableProps> = ({ openDialog }) => {
  const navigate = useNavigate()
  const [data, setData] = useState<TSettlement[]>([])
  const [page, setPage] = useState<number>(1)
  const { branches, setBranches, setLoading, loading, filters, setFilters } = useDeposit()

  const { watch } = useForm({
    defaultValues: { pageSize: 50 }
  })

  const { profile } = useAppStore()

  const totalData = useRef<TSettlement[]>([])

  const pageSize = watch('pageSize')

  const headers: TTableGridHeaders = [
    {
      title: 'ردیف',
      cellFC: (_record, indexRow) => (
        <span className="block text-center">
          {pageSize * (page - 1) + (indexRow + 1)}
        </span>
      )
    },

    { title: 'نام شعبه', keyData: 'store_name' },

    {
      title: 'شماره تراکنش بانکی',
      keyData: 'bank_reference',
      cellFC: (bank_reference) =>
        bank_reference ? (
          <Clipboard value={bank_reference}>{bank_reference}</Clipboard>
        ) : null
    },

    {
      title: 'شماره حساب واریزی',
      keyData: 'iban_snapshot',
      cellFC: (iban_snapshot) =>
        iban_snapshot ? (
          <Clipboard value={iban_snapshot}>{iban_snapshot}</Clipboard>
        ) : null
    },

    {
      title: 'مبلغ ناخالص',
      keyData: 'gross_amount',
      cellFC: (gross_amount) => <span>{price(gross_amount)}</span>
    },

    {
      title: 'مبلغ خالص',
      keyData: 'total_payable',
      cellFC: (total_payable) => <span>{price(total_payable)}</span>
    },

    {
      title: 'تعداد سفارشات تسویه شده',
      keyData: 'item_count',
      cellFC: (item_count) => <span>{`${item_count} سفارش`}</span>
    },

    {
      title: 'تاریخ تسویه',
      keyData: 'settled_at',
      cellFC: (settled_at: string) => (
        <span className="sc-interp">
          {settled_at ? utcToJalaali(settled_at || '') : ''}
        </span>
      )
    },

    {
      title: 'جزئیات',
      cellStyle: { width: '80px' },
      cellFC: (record) => (
        <span
          className="text-xl block"
          onClick={() => {
            navigate({ to: `${URLS.deposit.href}/${record?.id}` })
          }}
        >
          <ArrowRightIcon />
        </span>
      )
    }
  ]

  const updateData = (p?: number) => {
    const t = p || page
    const startIndex = (t - 1) * pageSize
    const pageData = totalData.current.slice(startIndex, startIndex + pageSize)
    setData(pageData)
  }

  const setBranchOptions = (data: IHomeRes) => {
    const userData = getUserData()
    const temp = hasItem(data?.merchant_store?.branches)
      ? data?.merchant_store?.branches?.map((el) => ({
          value: el?.id,
          title: el?.store_name
        }))
      : []

    if (Boolean(userData?.merchant_id)) {
      temp?.unshift({ title: 'همه شعب', value: 0 })
    }

    setBranches(temp)
  }

  const handleDataRes = (data: IHomeRes, branchId: number | undefined) => {
    const userData = getUserData()
    if (branches.length <= 1) {
      setBranchOptions(data)
    }

    if (branchId || !Boolean(userData?.merchant_id) || filters?.provider_branch_id) {
      const branch = data?.merchant_store?.branches[0]
      totalData.current = branch
        ? [...totalData.current, ...branch?.credit_ticket_settlement]
        : []
    } else {
      totalData.current = [
        ...totalData.current,
        ...data?.merchant_store?.credit_ticket_settlement
      ]
    }
  }

  const getDataTable = (payload?: ISettlementPayload) => {
    setLoading(true)

    apis.report
      .settlement(payload)
      .then((res) => {
        handleDataRes(res?.data?.payload?.data, payload?.provider_branch_id)
        updateData(1)
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const refreshTable = (payload?: ISettlementPayload) => {
    setPage(1)
    totalData.current = []
    setData([])
    setFilters(null)
    getDataTable(payload)
  }

  const goNextPage = async () => {
    if (page * pageSize >= totalData.current.length) {
      setLoading(true)
      const last_id = totalData.current[totalData.current.length - 1]?.id

      const payload = {
        ...filters,
        last_id
      }
      apis.report
        .settlement(payload)
        .then((res) => {
          handleDataRes(res?.data?.payload?.data, payload?.provider_branch_id)
          setPage((page) => ++page)
        })
        .catch((e) => {
          handleResponseError(e)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setPage((page) => ++page)
    }
  }

  const goPrevPage = () => {
    if (page > 1) {
      setPage((page) => --page)
    }
  }

  const convertExcelData = (excelData: TSettlement[]) => {
    return excelData?.map((el, index) => ({
      ...el,
      row: pageSize * (page - 1) + (index + 1),
      gross_amount: price(el.gross_amount || '', ''),
      total_payable: price(el.total_payable || '', ''),
      settled_at: el.settled_at ? utcToJalaali(el.settled_at || '') : ''
    }))
  }

  useEffect(() => {
    getDataTable({ provider_branch_id: profile?.branches?.[0]?.provider_id })
  }, [])

  useEffect(() => {
    updateData()
  }, [page])

  return (
    <div>
      <FilterTable getData={refreshTable} data={data} />
      <TableGrid
        className="pagination-table-grid"
        headers={headers}
        data={data}
        loading={loading}
        excelColumns={ExcelColumns}
        excelNamePrefix="Settlement"
        convertExcelData={convertExcelData}
      />
      <div className="pagination-table">
        {/* <div className="pagination-table__size">
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
        </div> */}

        <div className="pagination-table__pages">
          <button
            className="tp-icnbtn pagination-table__left-chevron"
            onClick={goPrevPage}
            disabled={page == 1}
          >
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
          {/* 
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
          ))} */}

          <button
            data-dc-tpl="129"
            className="tp-icnbtn pagination-table__right-chevron"
            onClick={goNextPage}
            disabled={page * pageSize > totalData.current?.length}
          >
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
