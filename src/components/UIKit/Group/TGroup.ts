import type { ComponentProps, PropsWithChildren, SetStateAction, Dispatch } from 'react'
import type { EWallet } from '@ts/Wallets'

export type TGroupItem = {
  value: string | number
  key: string | number
}

export type TGroupItems = (string | number | TGroupItem)[]

type TProps = {
  selected: string | number
  setSelected: Dispatch<SetStateAction<any>>
  classNameSelected?: string
}

export type TGroupProps = ComponentProps<'div'> & PropsWithChildren<TProps>
