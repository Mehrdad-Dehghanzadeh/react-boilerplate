import clsx from 'clsx'
import { type THeaderItem, type TTableGridProps } from './TTableGrid'
import { useId, type FC, type ReactNode } from 'react'
import { hasItem, deepClone } from '@utils'
import { useCsvBuilder } from '@/hooks'
import { Button } from '../Button/Button'
import ExcelIcon from '@assets/svg/excel.svg?react'
import './TableGrid.scss'

export const TableGrid: FC<TTableGridProps> = ({
  headers,
  data,
  loading = false,
  className = '',
  excelColumns = [],
  convertExcelData,
  excelNamePrefix="data-table",
  ...props
}) => {
  const selfId = useId()

  const renderCell = (head: THeaderItem, recode: any, indexRow: number): ReactNode => {
    if (head.cellFC) {
      const cellData = recode[head.keyData as any] || deepClone(recode)
      return head.cellFC(cellData, indexRow)
    }

    if (head.keyData && Object.hasOwn(recode, head.keyData)) {
      return recode[head.keyData as any]
    }

    return recode
  }

  const showHasNoData = (): boolean => {
    return !loading && !hasItem(data)
  }

  const { getDataCsv, csvLoading } = useCsvBuilder({ tableColumns: excelColumns })
  
  const createExcel = () => {
    let payload = [...data]
    if (convertExcelData) {
      payload = convertExcelData(payload)
    }
    getDataCsv(payload, `${excelNamePrefix}-${Date.now()}`)
  }
  return (
    <div className={clsx('table-grid', className)} {...props}>
      {hasItem(excelColumns) && (
        <div className='flex justify-end'>
          <Button
            className="w-[148px] bg-[#0EBB84] h-[40px] py-2 px-3 rounded-2xl mb-3"
            type="button"
            loading={csvLoading}
            onClick={createExcel}
            disabled={loading}
            color="success"
          >
            <span className="flex items-center">
              <ExcelIcon />
              <span className="font-sm font-bold mr-2">خروجی اکسل</span>
            </span>
          </Button>
        </div>
      )}
      <table className="table-grid__table">
        <thead className="table-grid__head">
          <tr className="table-grid__head-row">
            {headers?.map((el, index) => (
              <th
                className="table-grid__head-item"
                key={`${selfId}-${index}-table-head`}
                style={el?.headStyle}
              >
                {el?.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="table-grid__body">
          {loading ? (
            <>
              <tr className="table-grid__row skelton-loading ">
                {headers.map((head, indexCell) => (
                  <td
                    className=" h-12"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  ></td>
                ))}
              </tr>

              <tr className="table-grid__row skelton-loading ">
                {headers.map((head, indexCell) => (
                  <td
                    className=" h-12"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  ></td>
                ))}
              </tr>

              <tr className="table-grid__row skelton-loading ">
                {headers.map((head, indexCell) => (
                  <td
                    className=" h-12"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  ></td>
                ))}
              </tr>

              <tr className="table-grid__row skelton-loading">
                {headers.map((head, indexCell) => (
                  <td
                    className=" h-12"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  ></td>
                ))}
              </tr>

              <tr className="table-grid__row skelton-loading">
                {headers.map((head, indexCell) => (
                  <td
                    className=" h-12"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  ></td>
                ))}
              </tr>

              <tr className="table-grid__row skelton-loading">
                {headers.map((head, indexCell) => (
                  <td
                    className=" h-12"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  ></td>
                ))}
              </tr>
            </>
          ) : (
            data.map((recode, indexRow) => (
              <tr className="table-grid__row" key={`${indexRow}-${selfId}-table-row`}>
                {headers.map((head, indexCell) => (
                  <td
                    className="table-grid__cell"
                    key={`${indexCell}-${selfId}-table-cell`}
                    style={head.cellStyle}
                  >
                    {renderCell(head, recode, indexRow)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showHasNoData() && (
        <div className="table-grid__no-item">
          <strong className="text-lg font-semibold">داده برای نمایش وجود ندارد</strong>
        </div>
      )}
    </div>
  )
}
