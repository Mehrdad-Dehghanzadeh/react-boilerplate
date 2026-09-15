import type { TCalendarField } from './TCalendarField'
import type { RenderFC } from '@ts/Forms'
import type { DateRange } from '@daypicker/react'
import { useState, useRef, type FC, useEffect } from 'react'
import { Modal } from '@UIKit'
import CrossIcon from '@assets/svg/cross.svg?react'
import SolarCalendarIcon from '@assets/svg/solar-calendar.svg?react'
import useFormElements from '@hooks/useFormElements'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'
import { DayPicker, faIR } from '@daypicker/persian'
import { Button } from '../Button/Button'
import { dateToJalaali } from '@utils'
import '@daypicker/react/style.css'
import './CalendarField.scss'

export const CalendarField: FC<TCalendarField> = ({
  control,
  name,
  id,
  onChange,
  rules,
  clearCb,
  pickerProps,
  autoComplete = 'off',
  clearable = false,
  label = '',
  className = '',
  classNameControl = '',
  ltr = false,
  disabled = false,
  dense = false,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<DateRange>()
  const { selfId } = useFormElements({ id })
  const fieldRef = useRef<HTMLInputElement>(null)

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const onChangeEvent: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        e.isTrusted = true
        field.onChange(e)
        onChange?.(e)
      }

      const clear = () => {
        field.onChange('')
        clearCb?.()
      }

      const changeValue = () => {
        const fromValue = selected?.from ? dateToJalaali(selected?.from) : ''
        const toValue = selected?.to ? dateToJalaali(selected?.to) : ''
        const value = `${toValue}-${fromValue}`
        field.onChange(value)
        setOpen(false)
      }

      useEffect(() => {
        if (!Boolean(field.value)) {
          setSelected(undefined)
        }
      }, [field.value])

      return (
        <>
          <div
            className={clsx(
              ['control', 'control--has-suffix'],
              {
                'control--has-value': Boolean(field.value)
              },
              classNameControl
            )}
          >
            {Boolean(label) && <span className="control__label">{label}</span>}

            <div
              className="control__wrapper"
              onClick={(e) => {
                if (!disabled) {
                  e?.preventDefault()
                  setOpen(true)
                  fieldRef?.current?.blur()
                }
              }}
            >
              <input
                className={clsx([
                  'control__input',
                  {
                    'control__input--error': fieldState.invalid,
                    'control--has-clearable': clearable,
                    'control__input--ltr': ltr,
                    'control__input--dense': dense,
                    'control--has-label': Boolean(label)
                  }
                ])}
                type="text"
                id={selfId}
                name={name}
                value={field.value || ''}
                onChange={onChangeEvent}
                disabled={disabled}
                autoComplete={autoComplete}
                ref={fieldRef}
                {...props}
              />
              <span
                className="control__suffix"
                {...{ onClick: clearable ? clear : undefined }}
              >
                <SolarCalendarIcon />
              </span>

              {Boolean(field?.value && clearable && !disabled) && (
                <span className="control__clear" onClick={clear}>
                  <CrossIcon className="control__clear-icon" />
                </span>
              )}
            </div>

            {fieldState.invalid && (
              <em className="control__error-message">
                {fieldState.error?.message || ''}
              </em>
            )}
          </div>

          <Modal size="sm" open={open} setOpen={setOpen} title={label}>
            <DayPicker
              className="calendar-field__day-picker"
              locale={faIR}
              selected={selected}
              onSelect={setSelected}
              mode="range"
              {...pickerProps}
            />

            <Button
              className="mt-10"
              type="button"
              color="primary"
              disabled={!selected}
              onClick={changeValue}
            >
              ثبت
            </Button>
          </Modal>
        </>
      )
    }
  }

  return (
    <div className={clsx('calendar-field', className)}>
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
