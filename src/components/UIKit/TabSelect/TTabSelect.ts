import type { ComponentProps, Dispatch, SetStateAction } from 'react'

export type TabSelectItem = { title: string; value: any }

export type TabSelectItems = TabSelectItem[]

export type TabSelectProps = ComponentProps<'ul'> & {
  items: TabSelectItems
  setItem: Dispatch<SetStateAction<any>>
  defaultActiveIndex?: number
  disabled?: boolean
}
