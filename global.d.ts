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

type DataRecord<T = any> = object & Record<string, T>

type List<T = any> = T[]

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type EnumType = {
  id: string | number
  name: string | number
  color?: string
  [key: string]: any
}

type MapperItem = {
  text: string | number
  color?: string | Colors
  icon?: any
}

type EnumList = Array<EnumType>

declare module '*.css'
declare module '*.scss'
declare module '*.sass'

type Url = {
  href: string
  title?: string
}

type UrlItem = Url & {
  icon?: string | ReactNode
  needKyc?: boolean
}

type UrlList = UrlItem[]

type Urls = Record<string, UrlItem>
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

type DataList = {
  key: string | number | ReactNode
  value: string | number | ReactNode
}[]

type SelectInputItem<T = any> = {
  title: string
  value: string | number | EmptyString
  itemData?: T
}
