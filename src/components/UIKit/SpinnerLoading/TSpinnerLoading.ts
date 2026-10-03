import type { ComponentProps, PropsWithChildren } from 'react'

type Props = {
  loading: boolean
}

export type SpinnerLoadingProps = ComponentProps<'svg'> & PropsWithChildren<Props>
