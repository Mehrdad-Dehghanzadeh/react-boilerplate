import { useEffect, useRef, type FC, type MouseEventHandler } from 'react'
import type { TSelectMultiFieldProps, TSelectOptionItem } from './TSelectMultiField'
import type { RenderFC } from '@ts/Forms'
import { Controller } from 'react-hook-form'
import { createPortal } from 'react-dom'
import useFormElements from '@hooks/useFormElements'
import clsx from 'clsx'
import ChevronDown from '@assets/svg/chevron-down.svg?react'
import { useSelectField } from '@hooks'
import { hasItem, removeItem } from '@utils'
import './SelectField.scss'

export const SelectMultiField: FC<TSelectMultiFieldProps> = ({
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
  inputLabel = '',
  options = [],
  disabled = false,
  ...props
}) => {
  const menuRoot = document.getElementById('select-menu-root') as HTMLElement

  const { selfId } = useFormElements({ id })
  const selectRef = useRef<HTMLInputElement>(null)

  const { open, setOpen, domRect, calculateDomRect, fieldRef, listRef, hasOptions } =
    useSelectField({
      options,
      scrollTop
    })

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

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const hasValue = (): boolean => {
        if (!hasOptions) {
          return false
        }

        if (hasItem(field.value)) {
          return true
        }

        return Boolean(field.value)
      }

      const onChangeEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.isTrusted = true
        field.onChange(e)
        onChange?.(e)
      }

      const toggleValue = (value: any) => {
        if (selectRef?.current) {
          let values = Boolean(selectRef.current.value)
            ? [...String(selectRef.current.value)?.split(',')]
            : []

          if (values.findIndex((item) => item == value) > -1) {
            values = [...removeItem(values, value)]
          } else {
            values.push(value)
          }

          return values
        }
      }

      const selectItem = (value: any) => {
        if (selectRef.current) {
          const values = toggleValue(value)
          selectRef.current.value = JSON.stringify(values)
          field.onChange(values)
        }
      }

      return (
        <>
          <div
            className={clsx(
              'control',
              {
                'control--has-value': hasValue()
              },

              classNameControl
            )}
            role="combobox"
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
                    {hasValue()
                      ? textHoc?.(
                          options.find(
                            (el) => el.value == field.value
                          ) as TSelectOptionItem
                        ) ||
                        options
                          .filter((el) => {
                            return field.value
                              ?.map((item: string) => Number(item))
                              ?.includes(el.value)
                          })
                          ?.reduce((aum, cu) => `${aum}  ${cu?.title}`, '')
                      : ''}
                  </div>
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
              <em className="control__error-message">
                {fieldState.error?.message || ''}
              </em>
            )}

            <input
              className="select-field__element"
              name={name}
              type="hidden"
              id={selfId}
              value={field.value}
              onChange={onChangeEvent}
              ref={selectRef}
              {...props}
              hidden
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
                        className={clsx('select-field-menu__item', {
                          'select-field-menu__item--selected':
                            item.value == field.value ||
                            field.value?.find((el: any) => el == item.value)
                        })}
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
    </>
  )
}
