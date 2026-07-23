import type { ComponentProps, Dispatch, SetStateAction } from 'react'

export type TTabSelectItem = { title: string; value: any }


export type TTabSelectItems = TTabSelectItem[]

export type TTabSelectProps = ComponentProps<'ul'> & {
  items: TTabSelectItems
  setItem: Dispatch<SetStateAction<any>>
  defaultActiveIndex?: number
  disabled?: boolean
}
