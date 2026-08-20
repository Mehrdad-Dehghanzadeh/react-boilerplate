import type { ComponentProps, ReactNode, CSSProperties } from 'react'

export type THeaderItem<TTableData = any> = {
  title: string | ReactNode
  keyData?: string | keyof TTableData
  cellFC?: (data: TTableData) => ReactNode
  cellStyle?: CSSProperties
  headStyle?: CSSProperties
}

export type TTableGridHeaders<T = any> = THeaderItem<T>[]

export type TTableGridProps<TTableData = any> = ComponentProps<'div'> & {
  headers: TTableGridHeaders<TTableData>
  data: TTableData[]
  loading?: boolean
}
