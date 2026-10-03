import type { ComponentProps, PropsWithChildren, SetStateAction, Dispatch } from 'react'

export type GroupItem = {
  value: string | number
  key: string | number
}

export type GroupItems = (string | number | GroupItem)[]

type Props = {
  selected: string | number
  setSelected: Dispatch<SetStateAction<any>>
  classNameSelected?: string
}

export type GroupProps = ComponentProps<'div'> & PropsWithChildren<Props>
