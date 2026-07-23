type EmptyString = ''

type NumberString = `${number}`

type CssAbsoluteUnit =
  | `${number}cm`
  | `${number}mm`
  | `${number}in`
  | `${number}px`
  | `${number}pt`
  | `${number}pc`

type CssRelativeUnit =
  | `${number}em`
  | `${number}ex`
  | `${number}ch`
  | `${number}rem`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}%`

type PxUnit = `${number}px`
type PercentUnit = `${number}%`
type CssSizeValue = CssAbsoluteUnit | CssRelativeUnit

type TData<T = any> = object & Record<string, T>

type TList<T = any> = T[]

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type EnumType = {
  id: string | number
  name: string | number
  color?: string
  [key: string]: unknown
}

type TMapperItem = {
  text: string | number
  color?: string | TColor
  icon?: any
}

type EnumList = Array<EnumType>

declare module '*.css'
declare module '*.scss'
declare module '*.sass'

type TUrl = {
  href: string
  title?: string
}

type TUrlItem = TUrl & {
  icon?: string | ReactNode
  needKyc?: boolean
}

type TUrlList = TUrlItem[]

type TUrls = Record<string, TUrlItem>
interface IResponse<T = any> {
  date: string
  description: string
  payload: { data: T }
  rrn: ''
  statusCode: number
  statusMessage: string
  time: string
}

interface IPWAResponse<T = any> {
  date: string
  description: string
  payload: T
  rrn: ''
  statusCode: number
  statusMessage: string
  time: string
}

type TDataList = {
  key: string | number | ReactNode
  value: string | number | ReactNode
}[]

type TChartDataItem = {
  avg: {
    Int64: number | null
    Valid: boolean
  }
  bucket: string
}

type TChartDataList = TChartDataItem[]

type TChartStates = {
  labels: string[]
  values: (number | null)[]
}

type TChartPeriod = 'day' | 'week' | 'month' | 'year'
