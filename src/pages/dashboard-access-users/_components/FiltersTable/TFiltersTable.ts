import type { TAccountItem } from '@/ts/Common'
import type { Dispatch, SetStateAction } from 'react'

export type TFiltersTableProps = {
  totalData: TAccountItem[]
  setData: Dispatch<SetStateAction<TAccountItem[]>>
}

export type TFormData = {
  fullName: string
  mobile: string
  status: null | number
}
