import type {
  ComponentProps,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  ReactNode
} from 'react'

type TProps = PropsWithChildren<{
  expand: boolean
  innerContent: ReactNode
  setExpand?: Dispatch<SetStateAction<boolean>>
}>

export type TExpanderProps = ComponentProps<'div'> & TProps
