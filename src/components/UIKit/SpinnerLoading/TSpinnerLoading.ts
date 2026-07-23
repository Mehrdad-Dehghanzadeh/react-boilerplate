import type { ComponentProps, PropsWithChildren } from 'react'

type TProps = {
  loading: boolean
}

export type TSpinnerLoadingProps = ComponentProps<'svg'> & PropsWithChildren<TProps>
