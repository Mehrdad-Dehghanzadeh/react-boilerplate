import type {
  ComponentProps,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  ReactNode
} from 'react'

type Props = PropsWithChildren<{
  expand: boolean
  innerContent: ReactNode
  setExpand?: Dispatch<SetStateAction<boolean>>
}>

export type ExpanderProps = ComponentProps<'div'> & Props
