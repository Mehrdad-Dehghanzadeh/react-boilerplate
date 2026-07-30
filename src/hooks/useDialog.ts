import { type Dispatch, type SetStateAction } from 'react'
import { useEffect, useDeferredValue } from 'react'
import { BODY_DIALOG_OPEN_CLASS_NAME } from '@constants'

type TArg = {
  open: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  idRoot: string
}

export function useDialog({ open, setOpen, idRoot }: TArg) {
  const show = useDeferredValue(open)
  const root = document.getElementById(idRoot) as HTMLElement

  const close = () => {
    setOpen?.(false)
    document.body.classList.remove(BODY_DIALOG_OPEN_CLASS_NAME)
  }

  const toggleClassNameBody = () => {
    if (open) {
      document.body.classList.add(BODY_DIALOG_OPEN_CLASS_NAME)
    } else {
      document.body.classList.remove(BODY_DIALOG_OPEN_CLASS_NAME)
    }
  }

  useEffect(() => {
    toggleClassNameBody()
  }, [open])

  return {
    root,
    close,
    show
  }
}
