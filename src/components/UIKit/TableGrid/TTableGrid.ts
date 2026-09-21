import type { ComponentProps, ReactNode, CSSProperties } from 'react'
import type { TCsvColumns } from '@ts/Common'

export type THeaderItem<TTableData = any> = {
  title: string | ReactNode
  keyData?: string | keyof TTableData
  cellFC?: (data: TTableData, indexRow: number) => ReactNode
  cellStyle?: CSSProperties
  headStyle?: CSSProperties
}

export type TTableGridHeaders<T = any> = THeaderItem<T>[]

export type TTableGridProps<TTableData = any> = ComponentProps<'div'> & {
  headers: TTableGridHeaders<TTableData>
  data: TTableData[]
  loading?: boolean
  excelColumns?: TCsvColumns
  convertExcelData?: (data: TTableData[]) => unknown[]
  excelNamePrefix?: string
}
