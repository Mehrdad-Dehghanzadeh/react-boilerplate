import { useEffect, useRef, useState, type FC, type MouseEventHandler } from 'react'
import type { TSelectFieldProps, TSelectOptionItem, TDomRect } from './TSelectField'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import { createPortal } from 'react-dom'
import useFormElements from '@hooks/useFormElements'
import clsx from 'clsx'
import { hasItem } from '@utils'
import ChevronDown from '@assets/svg/chevron-down.svg?react'
import './SelectField.scss'

export const SelectField: FC<TSelectFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  scrollTop,
  itemHoc,
  textHoc,
  noItemMessage,
  openBottom = false,
  loading = false,
  menuFill = false,
  label = '',
  className = '',
  classNameControl = '',
  fieldTextClassName = '',
  options = [],
  ...props
}) => {
  const menuRoot = document.getElementById('select-menu-root') as HTMLElement

  const [open, setOpen] = useState<boolean>(false)
  const [domRect, setDomRect] = useState<TDomRect | null>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const { selfId } = useFormElements({ id })

  const hasOptioning = (): boolean => {
    return hasItem(options)
  }

  const hasOptions = hasOptioning()

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const setHasValue = () => {
        return hasOptions ? !!options?.find?.((item) => item.value == field.value) : false
      }

      const hasValue = setHasValue()

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
          {Boolean(label) && (
            <label className="control__label" htmlFor={selfId}>
              {label}
            </label>
          )}

          <div
            className={clsx('control__wrapper', { 'control--loading': loading })}
            onClick={openMenu}
          >
            <div
              className={clsx('select-field__input', {
                'select-field__input--error': fieldState.invalid
              })}
            >
              <div className={clsx('select-field__text', fieldTextClassName)}>
                {hasValue
                  ? textHoc?.(
                      options.find((el) => el.value == field.value) as TSelectOptionItem
                    ) || options.find((el) => el.value == field.value)?.title
                  : ''}
              </div>

              <span className="select-field__icon">
                <ChevronDown className="w-6 h-6" />
              </span>
            </div>
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
            {hasOptions &&
              options?.map((item) => (
                <option key={`${item.value}-${selfId}`} value={item.value}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>
      )
    }
  }

  const closeMenu = () => {
    setOpen(false)
  }

  const calculateDomRect = () => {
    if (fieldRef.current) {
      const client = fieldRef.current.getBoundingClientRect()
      setDomRect(() => ({
        width: `${client.width}px`,
        top: `${client.top + client.height + 12}px`,
        left: `${client.x}px`
      }))
    }
  }

  const clickOuter: MouseEventHandler<HTMLDivElement> = (e: any) => {
    e?.preventDefault()
    closeMenu()
  }

  const openMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (fieldRef.current && !loading) {
      setOpen(true)
      calculateDomRect()
    }
  }

  const changeValue = (value: any) => {
    if (selectRef.current) {
      selectRef.current.value = value
      const event = new Event('change', { bubbles: true })
      selectRef.current.dispatchEvent(event)
      closeMenu()
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
      <div
        className={clsx(
          'select-field',
          { 'select-field--open': open },
          { 'select-field--bottom-menu': openBottom },
          className
        )}
        ref={fieldRef}
      >
        <Controller
          control={control}
          name={name}
          render={renderFC.render}
          rules={rules}
        />
      </div>

      {open &&
        createPortal(
          <>
            <div className="select-field__overlay-menu" onClick={clickOuter}></div>
            <ul
              className={clsx('select-field-menu', {
                'select-field-menu--fill': menuFill,
                'select-field-menu--bottom-open': openBottom
              })}
              id="select-field-menu"
              ref={listRef}
              style={{
                width: domRect?.width,
                top: domRect?.top,
                left: domRect?.left
              }}
            >
              {hasOptions ? (
                options?.map((item: TSelectOptionItem) => (
                  <li
                    key={`${item.value}-${selfId}`}
                    className="select-field-menu__item"
                    onClick={() => {
                      changeValue(item.value)
                    }}
                  >
                    {itemHoc?.(item) || (
                      <span className="select-field-menu__title">{item.title}</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="select-field-menu__item">
                  {Boolean(noItemMessage) ? (
                    noItemMessage
                  ) : (
                    <span className="select-field-menu__title">موردی یافت نشد</span>
                  )}
                </li>
              )}
            </ul>
          </>,

          menuRoot
        )}
    </>
  )
}
