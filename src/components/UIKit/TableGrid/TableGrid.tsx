import clsx from 'clsx'
import { type THeaderItem, type TTableGridProps } from './TTableGrid'
import { useId, type FC, type ReactNode } from 'react'
import { hasItem, deepClone } from '@utils'
import './TableGrid.scss'

export const TableGrid: FC<TTableGridProps> = ({
  headers,
  data,
  loading = false,
  className = '',
  ...props
}) => {
  const selfId = useId()

  const renderCell = (head: THeaderItem, recode: any): ReactNode => {
    if (head.cellFC) {
      const cellData = recode[head.keyData as any] || deepClone(recode)
      return head.cellFC(cellData)
    }

    if (head.keyData && Object.hasOwn(recode, head.keyData)) {
      return recode[head.keyData as any]
    }

    return recode
  }

  return (
    <div className={clsx('table-grid', className)} {...props}>
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
                    {renderCell(head, recode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
