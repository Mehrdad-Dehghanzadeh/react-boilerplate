import type { IHomeRes, ISettlementIdPayload } from '@ts/services/Report'
import type { TCsvColumns } from '@ts/Common'
import type { TSettlement } from '@ts/Merchant'
import { useEffect, useRef, useState, type FC } from 'react'
import { TableGrid, type TTableGridHeaders, Clipboard } from '@UIKit'
import { useForm } from 'react-hook-form'
import { apis } from '@services'
import { getUserData, handleResponseError, hasItem, price, utcToJalaali } from '@utils'
import { URLS } from '@constants'
import { getRouteApi } from '@tanstack/react-router'

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

const RouteApi = getRouteApi(URLS.settlementDetails.href)

export const PaginationTable: FC = ({}) => {
  const queryParams = RouteApi.useSearch()

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const { watch } = useForm({
    defaultValues: { pageSize: 50 }
  })

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
    }
  ]

  const updateData = (p?: number) => {
    const t = p || page
    const startIndex = (t - 1) * pageSize
    const pageData = totalData.current.slice(startIndex, startIndex + pageSize)
    setData(pageData)
  }

  const handleDataRes = (data: IHomeRes, branchId: number | undefined) => {
    const userData = getUserData()

    if (branchId || !Boolean(userData?.merchant_id) || queryParams?.provider_branch_id) {
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

  const createPayload = (last_id?: number): ISettlementIdPayload => {
    const payload: ISettlementIdPayload = {
      settlement_id: Number(queryParams.settlement_id)
    }

    if (last_id) {
      payload.last_id = last_id
    }

    if (Number(queryParams.provider_branch_id)) {
      payload.provider_branch_id = Number(queryParams.provider_branch_id)
    }

    return payload
  }

  const getDataTable = () => {
    setLoading(true)
    const payload = createPayload()

    apis.report
      .settlementId(payload)
      .then((res) => {
        handleDataRes(res?.data?.payload?.data, queryParams?.provider_branch_id)
        updateData(1)
      })
      .catch((e) => {
        handleResponseError(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const goNextPage = async () => {
    if (page * pageSize >= totalData.current.length) {
      setLoading(true)

      const last_id = totalData.current[totalData.current.length - 1]?.id
      const payload = createPayload(last_id)

      apis.report
        .settlementId(payload)
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
    getDataTable()
  }, [])

  useEffect(() => {
    updateData()
  }, [page])

  return (
    <div>
      <TableGrid
        className="pagination-table-grid"
        headers={headers}
        data={data}
        loading={loading}
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
