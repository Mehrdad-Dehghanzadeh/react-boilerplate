import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type MouseEventHandler
} from 'react'
import type { TSelectSheetFieldProps, TSelectSheetItem } from './TSelectSheetField'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import useFormElements from '@hooks/useFormElements'
import clsx from 'clsx'
import { hasItem } from '@utils'
import ChevronDown from '@assets/svg/chevron-down.svg?react'
import { BottomSheet } from '@UIKit'
import './SelectSheetField.scss'

export const SelectSheetField: FC<TSelectSheetFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  scrollTop,
  itemHoc,
  textHoc,
  noItemMessage,
  noItemsAction,
  loading = false,
  onClick,
  label = '',
  className = '',
  classNameControl = '',
  fieldTextClassName = '',
  items = [],
  title = '',
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLSelectElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const { selfId } = useFormElements({ id })

  const hasItems = useMemo<boolean>(() => hasItem(items), [items])
  const blockDialogOpen = useMemo<boolean>(
    () => (noItemsAction ? !hasItem(items) : true),
    [items, noItemsAction]
  )

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const hasValue = useMemo<boolean>(
        () => (hasItems ? !!items?.find?.((item) => item.value == field.value) : false),
        [items, field.value]
      )

      const onChangeEvent: React.ChangeEventHandler<HTMLSelectElement> = async (e) => {
        e.isTrusted = true
        field.onChange(e)
        onChange?.(e)
      }

      return (
        <div
          className={clsx(
            'control',
            { 'control--has-value': hasValue },
            classNameControl
          )}
        >
          <div
            className={clsx('control__wrapper', { 'control--loading': loading })}
            onClick={openBottomSheet}
          >
            <div
              className={clsx('select-field__input', {
                'select-field__input--error': fieldState.invalid
              })}
            >
              <div className={clsx('select-field__text', fieldTextClassName)}>
                {hasValue
                  ? textHoc?.(
                      items.find((el) => el.value == field.value) as TSelectSheetItem
                    ) || items.find((el) => el.value == field.value)?.title
                  : ''}
              </div>

              <span className="select-field__icon">
                <ChevronDown className="w-6 h-6" />
              </span>
            </div>
            <legend className="control__legend">{label}</legend>
          </div>
          {Boolean(loading) && (
            <div className="control__loading">
              <span className="control__loading-fill"></span>
            </div>
          )}

          {fieldState.invalid && (
            <em className="control__error-message">{fieldState.error?.message || ''}</em>
          )}

          <select
            className="select-field__element"
            name={name}
            id={selfId}
            defaultValue={field.value}
            onChange={onChangeEvent}
            ref={selectRef}
            {...props}
            hidden
          >
            <option value=""></option>
            {hasItems &&
              items?.map((item) => (
                <option key={`${item.value}-${selfId}`} value={item.value}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>
      )
    }
  }

  const closeBottomSheet = () => {
    setOpen(false)
  }

  const openBottomSheet: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()

    if (blockDialogOpen) {
      noItemsAction?.()
      return
    }

    if (fieldRef.current && !loading) {
      setOpen(true)
    }
  }

  const changeValue = (value: any) => {
    if (selectRef.current) {
      selectRef.current.value = value
      const event = new Event('change', { bubbles: true })
      selectRef.current.dispatchEvent(event)
      closeBottomSheet()
    }
  }

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

  useEffect(() => {
    scrollToTop()
  }, [open])

  return (
    <>
      <div className={clsx('select-sheet-field', className)} ref={fieldRef}>
        <Controller
          control={control}
          name={name}
          render={renderFC.render}
          rules={rules}
        />
      </div>

      <BottomSheet open={open} setOpen={setOpen} title={title}>
        <ul className={clsx('select-sheet-field-menu', {})} ref={listRef}>
          {hasItems ? (
            items?.map((item: TSelectSheetItem) => (
              <li
                key={`${item.value}-${selfId}`}
                className={clsx('select-sheet-field-menu__item', {
                  'select-sheet-field-menu__item--selected':
                    selectRef?.current?.value == item.value
                })}
                onClick={() => {
                  changeValue(item.value)
                }}
              >
                {itemHoc?.(item) || (
                  <span className="select-sheet-field-menu__title">{item.title}</span>
                )}
              </li>
            ))
          ) : (
            <li className="select-sheet-field-menu__item">
              {Boolean(noItemMessage) ? (
                noItemMessage
              ) : (
                <span className="select-sheet-field-menu__title">موردی یافت نشد</span>
              )}
            </li>
          )}
        </ul>
      </BottomSheet>
    </>
  )
}
