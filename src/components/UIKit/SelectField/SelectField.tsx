import { useEffect, useRef, useState, type FC, type MouseEventHandler } from 'react'
import type { TSelectFieldProps, TSelectOptionItem, TDomRect } from './TSelectField'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import { createPortal } from 'react-dom'
import useFormElements from '@hooks/useFormElements'
import clsx from 'clsx'
import ChevronDown from '@assets/svg/chevron-down.svg?react'
import CrossCircle from '@assets/svg/cross-circle.svg?react'
import { useSelectField } from '@hooks'
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
  clearable,
  noItemMessage,
  openBottom = false,
  loading = false,
  menuFill = false,
  label = '',
  className = '',
  classNameControl = '',
  fieldTextClassName = '',
  inputLabel = '',
  options = [],
  disabled = false,
  ...props
}) => {
  const menuRoot = document.getElementById('select-menu-root') as HTMLElement

  const { selfId } = useFormElements({ id })

  const {
    open,
    setOpen,
    domRect,
    calculateDomRect,
    selectRef,
    fieldRef,
    listRef,
    hasOptions,
    changeValue,
    setHasValue
  } = useSelectField({
    options,
    scrollTop
  })

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const hasValue = setHasValue(field.value)

      const onChangeEvent: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        e.isTrusted = true
        field.onChange(e)
        onChange?.(e)
      }

      return (
        <div
          className={clsx(
            'control',
            {
              'control--has-value': hasValue
            },

            classNameControl
          )}
        >
          {Boolean(label) && (
            <label className="control__label" htmlFor={selfId}>
              {label}
            </label>
          )}

          <div
            className={clsx('control__wrapper', {
              'control--loading': loading || disabled
            })}
            onClick={openMenu}
          >
            <div
              className={clsx('select-field__input', {
                'select-field__input--error': fieldState.invalid
              })}
            >
              <div className="select-field__text-wrapper">
                {Boolean(inputLabel) && (
                  <em className="select-field__input-label">{inputLabel}</em>
                )}
                <div className={clsx('select-field__text', fieldTextClassName)}>
                  {hasValue
                    ? textHoc?.(
                        options.find((el) => el.value == field.value) as TSelectOptionItem
                      ) || options.find((el) => el.value == field.value)?.title
                    : ''}
                </div>
              </div>

              <span className="flex">
                {Boolean(clearable && hasValue) ? (
                  <CrossCircle
                    className="w-6 h-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      changeValue('')
                    }}
                  />
                ) : (
                  <span className="select-field__icon">
                    <ChevronDown className="w-6 h-6" />
                  </span>
                )}
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

  const clickOuter: MouseEventHandler<HTMLDivElement> = (e: any) => {
    e?.preventDefault()
    closeMenu()
  }

  const openMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    if (fieldRef.current && !loading && !disabled) {
      setOpen(true)
    }
  }

  const selectItem = (value: any) => {
    if (selectRef.current) {
      changeValue(value)
      closeMenu()
    }
  }

  useEffect(() => {
    calculateDomRect()
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
                      selectItem(item.value)
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
