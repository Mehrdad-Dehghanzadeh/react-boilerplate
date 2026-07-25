import { useId } from 'react'

export type TArg = {
  id: string | undefined
}

export default function ({ id }: TArg) {
  const _id = useId()
  
  const setSelfId = (): string => {
    return `${_id}-${id ?? ''}`
  }

  const selfId = setSelfId()

  return {
    selfId
  }
}
