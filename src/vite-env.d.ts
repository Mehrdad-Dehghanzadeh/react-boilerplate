import 'vite-plugin-svgr/client'
import 'vite/client'

declare global {
  type PropsOf<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>
}

export {}
