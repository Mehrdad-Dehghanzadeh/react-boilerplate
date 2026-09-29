import type { IHomeRes, ISettlementIdPayload } from '@ts/services/Report'
import type { TCsvColumns } from '@ts/Common'
import type { TSettlementItemStatus, TSettlementItem } from '@ts/Merchant'
import { useEffect, useRef, useState, type FC } from 'react'
import { TableGrid, type TTableGridHeaders, Clipboard, Chip } from '@UIKit'
import { useForm } from 'react-hook-form'
import { apis } from '@services'
import { getUserData, handleResponseError, hasItem, price, utcToJalaali } from '@utils'
import { URLS } from '@constants'
import { getRouteApi } from '@tanstack/react-router'
import { SETTLEMENT_STATUS } from '@constants'

const ExcelColumns: TCsvColumns = [
  { title: 'ردیف', dataIndex: 'row' },
  {
    title: 'شناسه',
    dataIndex: 'id'
  },
  {
    title: 'نام کاربر',
    dataIndex: 'full_name'
  },
  { title: 'نام شعبه', dataIndex: 'store_name' },
  {
    title: 'شماره تماس کاربر',
    dataIndex: 'mobile'
  },

  {
    title: 'کد پیگیری سفارش',
    dataIndex: 'track_number'
  },

  {
    title: 'مبلغ ناخالص',
    dataIndex: 'gross_amount'
  },

  {
    title: 'مبلغ خالص',
    dataIndex: 'net_amount'
  },

  {
    title: 'تاریخ سفارش',
    dataIndex: 'created_at'
  },

  {
    title: 'وضعیت',
    dataIndex: 'status'
  }
]

const RouteApi = getRouteApi(URLS.settlementDetails.href)

export const PaginationTable: FC = ({}) => {
  const queryParams = RouteApi.useSearch()

  const [data, setData] = useState<TSettlementItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const { watch } = useForm({
    defaultValues: { pageSize: 50 }
  })

  const totalData = useRef<TSettlementItem[]>([])

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

    {
      title: 'نام و نام خانوادگی کاربر',
      cellFC: (record) => <span>{`${record?.name || ''} ${record?.family || ''}`}</span>
    },

    { title: 'نام شعبه', keyData: 'store_name' },

    {
      title: 'شماره تماس کاربر',
      keyData: 'mobile',
      cellFC: (mobile) => (mobile ? <Clipboard value={mobile}>{mobile}</Clipboard> : null)
    },

    {
      title: 'کد پیگیری سفارش',
      keyData: 'track_number',
      cellFC: (track_number) =>
        track_number ? <Clipboard value={track_number}>{track_number}</Clipboard> : null
    },

    {
      title: 'مبلغ ناخالص',
      keyData: 'gross_amount',
      cellFC: (gross_amount) => <span>{price(gross_amount)}</span>
    },

    {
      title: 'مبلغ خالص',
      keyData: 'net_amount',
      cellFC: (net_amount) => <span>{price(net_amount)}</span>
    },

    {
      title: 'تاریخ سفارش',
      keyData: 'created_at',
      cellFC: (created_at: string) => (
        <span className="sc-interp">
          {created_at ? utcToJalaali(created_at || '') : ''}
        </span>
      )
    },

    {
      title: 'وضعیت',
      keyData: 'status',
      cellFC: (status: TSettlementItemStatus) => (
        //@ts-ignore
        <Chip color={SETTLEMENT_STATUS[status]?.color}>
          {status ? SETTLEMENT_STATUS[status]?.title : ''}
        </Chip>
      )
    },

    {
      title: 'جزئیات',
      cellStyle: { width: '80px' },
      expandFC: (record) => record?.status == '4'
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
        ? [...totalData.current, ...branch?.credit_ticket_settlement_items]
        : []
    } else {
      totalData.current = [
        ...totalData.current,
        ...data?.merchant_store?.credit_ticket_settlement_items
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

  const convertExcelData = (excelData: TSettlementItem[]) => {
    return excelData?.map((el, index) => ({
      ...el,
      row: pageSize * (page - 1) + (index + 1),
      full_name: `${el?.name || ''} ${el?.family || ''}`,
      created_at: el.created_at ? utcToJalaali(el.created_at || '') : '',
      net_amount: price(el.net_amount || '', ''),
      gross_amount: price(el.gross_amount || '', ''),
      status: el?.status ? SETTLEMENT_STATUS[el?.status]?.title : ''
    }))
  }

  const expandRow = (data: TSettlementItem) => (
    <span className="flex flex-wrap w-full justify-center">
      <span className="flex items-center ml-5">
        <strong>تاریخ سفارش :</strong>
        <span className="mr-1">
          {data?.child_created_at ? utcToJalaali(data?.child_created_at || '') : ''}
        </span>
      </span>

      <span className="flex items-center ml-5">
        <strong>مبلغ ناخالص :</strong>
        <span className="mr-1">{price(data?.child_gross_amount) || ''}</span>
      </span>

      <span className="flex items-center ml-5">
        <strong>مبلغ خالص :</strong>
        <span className="mr-1">{price(data?.child_net_amount) || ''}</span>
      </span>

      <span className="flex items-center ml-5">
        <strong>وضعیت :</strong>
        {data?.child_status && (
          //@ts-ignore
          <Chip color={SETTLEMENT_STATUS[data?.child_status]?.color}>
            {
              //@ts-ignore
              data?.child_status ? SETTLEMENT_STATUS[data?.child_status]?.title : ''
            }
          </Chip>
        )}
      </span>
    </span>
  )

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
        excelColumns={ExcelColumns}
        excelNamePrefix="Settlement_Item"
        convertExcelData={convertExcelData}
        expandRow={expandRow}
        title={`سفارشات تسویه شده در پرداخت ${queryParams.bank_reference || ''}`}
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
