import { useEffect, useRef, useState, type FC, type MouseEventHandler } from 'react'
import type { TSelectSheetFieldProps } from './TSelectSheetField'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import useFormElements from '@hooks/useFormElements'
import clsx from 'clsx'
import { hasItem } from '@utils'
import ChevronDown from '@assets/svg/chevron-down.svg?react'
import { BottomSheet } from '@UIKit'
import { useSelectField } from '@hooks'
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
  onClick,
  loading = false,
  label = '',
  className = '',
  classNameControl = '',
  fieldTextClassName = '',
  options = [],
  title = '',
  ...props
}) => {
  const {
    open,
    setOpen,
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

  const { selfId } = useFormElements({ id })

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const hasValue = setHasValue(field.value)

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
                      options.find((el) => el.value == field.value) as TSelectOption
                    ) || options.find((el) => el.value == field.value)?.title
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

  const closeBottomSheet = () => {
    setOpen(false)
  }

  const openBottomSheet: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()

    if (fieldRef.current && !loading) {
      setOpen(true)
    }
  }

  const selectItem = (value: any) => {
    if (selectRef.current) {
      changeValue(value)
      closeBottomSheet()
    }
  }

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
          {hasOptions ? (
            options?.map((item: TSelectOption) => (
              <li
                key={`${item.value}-${selfId}`}
                className={clsx('select-sheet-field-menu__item', {
                  'select-sheet-field-menu__item--selected':
                    selectRef?.current?.value == item.value
                })}
                onClick={() => {
                  selectItem(item.value)
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
