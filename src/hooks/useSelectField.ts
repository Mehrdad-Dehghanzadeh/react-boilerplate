import type { TScrollTop, TDomRect } from '@ts/FormElements'
import { useState, useRef, useEffect } from 'react'
import { hasItem } from '@utils'

type TConfig = { options: TSelectOptions; scrollTop?: TScrollTop }

export function useSelectField({ options, scrollTop }: TConfig) {
  const selectRef = useRef<HTMLSelectElement | HTMLInputElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const [open, setOpen] = useState<boolean>(false)
  const [domRect, setDomRect] = useState<TDomRect | null>(null)

  const hasOptioning = (): boolean => {
    return hasItem(options)
  }

  const hasOptions: boolean = hasOptioning()

  const scrollToTop = () => {
    const menuList = listRef?.current

    if (scrollTop && menuList && open) {
      const tops = {
        middle: (menuList?.scrollHeight - menuList?.clientHeight) * 0.5,
        quarterTop: (menuList?.scrollHeight - menuList?.clientHeight) * 0.25,
        quarterBottom: (menuList?.scrollHeight - menuList?.clientHeight) * 0.75
      }
      const top =
        typeof scrollTop === 'string' &&
        ['middle', 'quarterTop', 'quarterBottom'].includes(scrollTop)
          ? (tops[scrollTop] as number)
          : (scrollTop as number)

      menuList.scrollTo({
        top
      })
    }
  }

  const changeValue = (value: any) => {
    if (selectRef.current) {
      selectRef.current.value = value
      const event = new Event('change', { bubbles: true })
      selectRef.current.dispatchEvent(event)
    }
  }

  const setHasValue = (value: any): boolean => {
    return hasOptions ? !!options?.find?.((item) => item.value == value) : false
  }

  const calculateDomRect = () => {
    if (fieldRef.current && open) {
      const client = fieldRef.current.getBoundingClientRect()

      const menuHeight = listRef?.current?.offsetHeight || 240
      const spaceBelow = window.innerHeight - client.bottom
      const spaceAbove = client.top

      const openUp = spaceBelow < menuHeight && spaceAbove > spaceBelow

      setDomRect(() => ({
        width: `${client.width}px`,
        top: openUp
          ? `${client.top + window.scrollY - menuHeight - 8}px`
          : `${client.bottom + window.scrollY + 8}px`,

        left: `${client.x}px`
      }))
    }
  }

  useEffect(() => {
    scrollToTop()
  }, [open])

  return {
    open,
    setOpen,
    selectRef,
    fieldRef,
    listRef,
    changeValue,
    hasOptions,
    calculateDomRect,
    setHasValue,
    domRect
  }
}
