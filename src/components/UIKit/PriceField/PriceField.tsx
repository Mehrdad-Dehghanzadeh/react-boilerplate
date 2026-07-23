import { useEffect, useRef, useState, type FC } from 'react'
import useFormElements from '@hooks/useFormElements'
import type { TPriceFieldProps } from './TPriceField'
import { Controller } from 'react-hook-form'
import type { RenderFC } from '@ts/Forms'
import clsx from 'clsx'
import { $t } from '@locales'
import { price, convertNumbers2English } from '@utils'
import CrossIcon from '@assets/svg/cross.svg?react'
import './PriceField.scss'

export const PriceField: FC<TPriceFieldProps> = ({
  control,
  name,
  id,
  onChange,
  rules,
  clearCb,
  disabled = false,
  type = 'text',
  label = '',
  suffix = $t('common.moneyUnit'),
  classNameControl = '',
  inputMode = 'numeric',
  helperCb = null,
  helperText = '',
  clearable = false,
  className = '',
  ...props
}) => {
  const { selfId } = useFormElements({ id })

  const renderFC: RenderFC = {
    render({ field, fieldState }) {
      const [maskValue, setMaskValue] = useState<string>(price(field?.value, '') || '')

      const inputRef = useRef<HTMLInputElement>(null)

      const changeMaskValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const str = e?.target?.value ? String(e?.target?.value).replaceAll(',', '') : ''
        const fieldValue = str ? convertNumbers2English(String(str)) : ''

        const newChangeEvent = {
          ...e,
          target: { ...e.target, value: fieldValue }
        }

        if (inputRef.current) {
          field.onChange(newChangeEvent)
          onChange?.(newChangeEvent)
        }
      }

      const setValue = () => {
        if (inputRef.current) {
          const fieldValue = field.value
            ? convertNumbers2English(String(field.value))
            : ''
          const value = price(fieldValue, '', '')
          setMaskValue(value)
          inputRef.current.value = value
        }
      }

      const clear = () => {
        field.onChange('')
        clearCb?.()
      }

      useEffect(() => {
        setValue()
      }, [field.value])

      return (
        <div
          className={clsx(
            'control',
            'control--has-suffix',
            {
              'control--has-value': Boolean(field.value)
            },
            classNameControl
          )}
        >
          <div className="control__wrapper">
            <input
              className={clsx([
                'control__input',
                {
                  'control--has-clearable': clearable,
                  'control__input--error': fieldState.invalid,
                  'control--has-label': Boolean(label)
                }
              ])}
              type={type}
              id={`${selfId}-input-control`}
              value={maskValue}
              onChange={changeMaskValue}
              name={name}
              inputMode={inputMode}
              ref={inputRef}
              disabled={disabled}
              {...props}
            />
            <legend className="control__legend">{label}</legend>

            <span
              className="control__suffix"
              {...{ onClick: clearable ? clear : undefined }}
            >
              {suffix}
            </span>

            {Boolean(field?.value && !disabled && clearable) && (
              <span className="control__clear" onClick={clear}>
                <CrossIcon className="control__clear-icon" />
              </span>
            )}
          </div>

          {fieldState.invalid ? (
            <em className="control__error-message">{fieldState.error?.message || ''}</em>
          ) : (
            Boolean(helperCb || helperText) && (
              <em className="control__helper-text">
                {helperCb?.(field?.value) || helperText}
              </em>
            )
          )}
        </div>
      )
    }
  }

  return (
    <div className={clsx('price-field', className)}>
      <Controller control={control} name={name} render={renderFC.render} rules={rules} />
    </div>
  )
}
